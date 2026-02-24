import { NextRequest, NextResponse } from 'next/server';

// WxPusher configuration
const WX_PUSHER_TOKEN = process.env.WX_PUSHER_TOKEN;
const WX_PUSHER_UID = process.env.WX_PUSHER_UID;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customer_name,
      company,
      email,
      phone,
      wechat_id,
      message,
      contact_method,
      interested_ips,
    } = body;

    // Validation
    if (!customer_name || !company || !email) {
      return NextResponse.json(
        { error: '请填写必填项：姓名、公司、邮箱' },
        { status: 400 }
      );
    }

    // Prepare email content
    const inquiryDetails = `
<h2>新咨询通知</h2>
<p><strong>客户姓名：</strong>${customer_name}</p>
<p><strong>公司：</strong>${company}</p>
<p><strong>邮箱：</strong>${email}</p>
<p><strong>电话：</strong>${phone || '未填写'}</p>
<p><strong>微信号：</strong>${wechat_id || '未填写'}</p>
<p><strong> preferred联系方式：</strong>${contact_method === 'email' ? '邮件' : contact_method === 'wechat' ? '微信' : '都可以'}</p>
<p><strong>感兴趣的IP：</strong>${interested_ips?.join(', ') || '未选择'}</p>
<p><strong>需求描述：</strong></p>
<p>${message || '未填写'}</p>
<p><strong>提交时间：</strong>${new Date().toLocaleString('zh-CN')}</p>
    `;

    const confirmationEmail = `
<h2>咨询确认</h2>
<p>尊敬的 ${customer_name}，</p>
<p>感谢您联系 IP Hub！我们已收到您的咨询，将在24小时内与您联系。</p>
<p><strong>您的咨询内容：</strong></p>
<p>${message || '未填写详细需求'}</p>
<p>如有紧急需求，请直接回复此邮件或通过微信联系我们。</p>
<br>
<p>此致</p>
<p>IP Hub 团队</p>
    `;

    const results = {
      emailSent: false,
      wechatSent: false,
      errors: [] as string[],
    };

    // Send email using Resend (if configured)
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        // Send email to owner
        if (process.env.OWNER_EMAIL) {
          await resend.emails.send({
            from: 'IP Hub <contact@iphub.com>',
            to: process.env.OWNER_EMAIL,
            subject: `【新咨询】${company} - ${customer_name}`,
            html: inquiryDetails,
          });
          results.emailSent = true;
        }

        // Send confirmation email to customer
        await resend.emails.send({
          from: 'IP Hub <contact@iphub.com>',
          to: email,
          subject: '【IP Hub】咨询确认 - 我们将在24小时内联系您',
          html: confirmationEmail,
        });
      } catch (error) {
        console.error('Error sending email:', error);
        results.errors.push('发送邮件失败');
      }
    }

    // Send WeChat notification (if WxPusher is configured)
    if (WX_PUSHER_TOKEN && WX_PUSHER_UID) {
      try {
        const wxResponse = await fetch('https://wxpusher.zjiecode.com/api/send/message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            appToken: WX_PUSHER_TOKEN,
            content: `【IP Hub新咨询】\n客户：${customer_name}\n公司：${company}\n邮箱：${email}\n电话：${phone || '未填写'}\n微信：${wechat_id || '未填写'}\n感兴趣的IP：${interested_ips?.join(', ') || '未选择'}`,
            summary: `新咨询：${company} - ${customer_name}`,
            uids: [WX_PUSHER_UID],
          }),
        });

        if (wxResponse.ok) {
          results.wechatSent = true;
        } else {
          results.errors.push('微信推送失败');
        }
      } catch (error) {
        console.error('Error sending WeChat notification:', error);
        results.errors.push('微信推送失败');
      }
    }

    // Store inquiry in database (if Supabase is configured)
    // This would normally use the Supabase client to insert data
    // For now, we'll just log it
    console.log('New inquiry:', {
      customer_name,
      company,
      email,
      phone,
      wechat_id,
      message,
      contact_method,
      interested_ips,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: '咨询提交成功',
      details: results,
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: '提交失败，请稍后重试' },
      { status: 500 }
    );
  }
}
