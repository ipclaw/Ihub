# IP Hub

独立IP选型顾问平台 - 中立对比多家IP供应商PPA，降低选型成本，加速决策。

## 技术栈

- Next.js 14 + TypeScript
- Tailwind CSS
- Supabase (数据库)
- Resend (邮件服务)
- WxPusher (微信推送)

## 环境变量配置

复制 `.env.example` 为 `.env.local`，并填入你的API密钥：

```bash
NEXT_PUBLIC_SUPABASE_URL=你的Supabase URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase密钥
RESEND_API_KEY=你的Resend密钥
OWNER_EMAIL=你的邮箱
WX_PUSHER_TOKEN=你的WxPusher Token
WX_PUSHER_UID=你的WxPusher UID
```

## 本地开发

```bash
npm install
npm run dev
```

## 部署

项目已配置为静态导出，可直接部署到 Vercel。

## 功能特性

- IP产品搜索与筛选
- PPA参数对比（频率/面积/功耗）
- 供应商信息展示
- 联系咨询表单
- 邮件与微信通知
