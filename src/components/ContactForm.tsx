'use client';

import { useState } from 'react';
import { IPProduct } from '@/types';
import { 
  Send, 
  MessageSquare, 
  Mail, 
  User, 
  Building2, 
  Phone,
  CheckCircle2,
  Loader2
} from 'lucide-react';

interface ContactFormProps {
  selectedIPs?: IPProduct[];
}

export default function ContactForm({ selectedIPs = [] }: ContactFormProps) {
  const [formData, setFormData] = useState({
    customer_name: '',
    company: '',
    email: '',
    phone: '',
    wechat_id: '',
    message: '',
    contact_method: 'email' as 'email' | 'wechat' | 'both',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          interested_ips: selectedIPs.map(ip => ip.id),
        }),
      });

      if (!response.ok) {
        throw new Error('提交失败，请稍后重试');
      }

      setIsSuccess(true);
      setFormData({
        customer_name: '',
        company: '',
        email: '',
        phone: '',
        wechat_id: '',
        message: '',
        contact_method: 'email',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '提交失败');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">提交成功！</h3>
        <p className="text-slate-600 mb-6">
          我们已收到您的咨询，将在24小时内与您联系。
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="btn-secondary"
        >
          继续咨询
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Selected IPs */}
      {selectedIPs.length > 0 && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-900 mb-2">感兴趣的IP：</p>
          <div className="flex flex-wrap gap-2">
            {selectedIPs.map((ip) => (
              <span
                key={ip.id}
                className="text-xs px-2 py-1 bg-white text-blue-700 rounded border border-blue-200"
              >
                {ip.name} ({ip.vendor_code})
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            姓名 <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              required
              value={formData.customer_name}
              onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
              placeholder="请输入您的姓名"
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            公司 <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="请输入公司名称"
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            邮箱 <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="请输入邮箱地址"
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            电话
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="请输入联系电话"
              className="input-field pl-10"
            />
          </div>
        </div>
      </div>

      {/* WeChat ID */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          微信号（选填）
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={formData.wechat_id}
            onChange={(e) => setFormData({ ...formData, wechat_id: e.target.value })}
            placeholder="如需微信联系，请输入微信号"
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Contact Method */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
           preferred联系方式
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="contact_method"
              value="email"
              checked={formData.contact_method === 'email'}
              onChange={(e) => setFormData({ ...formData, contact_method: e.target.value as 'email' | 'wechat' | 'both' })}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm text-slate-700">邮件</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="contact_method"
              value="wechat"
              checked={formData.contact_method === 'wechat'}
              onChange={(e) => setFormData({ ...formData, contact_method: e.target.value as 'email' | 'wechat' | 'both' })}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm text-slate-700">微信</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="contact_method"
              value="both"
              checked={formData.contact_method === 'both'}
              onChange={(e) => setFormData({ ...formData, contact_method: e.target.value as 'email' | 'wechat' | 'both' })}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm text-slate-700">都可以</span>
          </label>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          需求描述
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="请描述您的IP选型需求，包括应用场景、工艺节点、性能要求等..."
          rows={4}
          className="input-field resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            提交中...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            提交咨询
          </>
        )}
      </button>

      <p className="text-xs text-slate-500 text-center">
        提交后，我们将通过邮件和微信通知您
      </p>
    </form>
  );
}
