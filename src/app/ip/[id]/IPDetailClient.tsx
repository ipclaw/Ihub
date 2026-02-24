'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { IPProduct } from '@/types';
import { 
  getMockIPProductById, 
  getMockSimilarIPs
} from '@/lib/mock-data';
import { 
  Cpu, 
  Zap, 
  Maximize, 
  Award, 
  CheckCircle2,
  FileText,
  Scale,
  ExternalLink,
  ChevronRight,
  MessageCircle
} from 'lucide-react';

interface IPDetailClientProps {
  id: string;
}

export default function IPDetailClient({ id }: IPDetailClientProps) {
  const [product, setProduct] = useState<IPProduct | null>(null);
  const [similarIPs, setSimilarIPs] = useState<IPProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = getMockIPProductById(id);
    setProduct(found);
    
    if (found) {
      const similar = getMockSimilarIPs(found);
      setSimilarIPs(similar);
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="container-max section-padding py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-slate-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-40 bg-slate-200 rounded"></div>
              <div className="h-40 bg-slate-200 rounded"></div>
              <div className="h-40 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="container-max section-padding py-20 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Cpu className="w-8 h-8 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">IP产品未找到</h1>
          <p className="text-slate-600 mb-6">该IP产品可能已下架或不存在</p>
          <Link href="/" className="btn-primary">
            返回首页
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="container-max section-padding py-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-slate-900">首页</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/#products" className="hover:text-slate-900">IP产品</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="container-max section-padding">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-medium px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                  {product.vendor_tier}
                </span>
                <span className="text-sm text-slate-500">{product.vendor_region}</span>
                <span className="text-sm px-2 py-1 bg-green-50 text-green-700 rounded">
                  {product.interface_type}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {product.name}
              </h1>

              <p className="text-lg text-slate-600 mb-6">
                {product.vendor?.description || product.vendor_code}
              </p>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <Zap className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-slate-900">{product.max_frequency_mhz}</p>
                  <p className="text-sm text-slate-500">MHz 最高频率</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <Maximize className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-slate-900">{product.area_value}</p>
                  <p className="text-sm text-slate-500">{product.area_unit} 面积</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <Cpu className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-slate-900">{product.power_dynamic_mw}</p>
                  <p className="text-sm text-slate-500">mW 动态功耗</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/compare?ids=${product.id}`}
                  className="btn-primary flex items-center gap-2"
                >
                  <Scale className="w-5 h-5" />
                  加入对比
                </Link>
                <Link
                  href="#contact"
                  className="btn-secondary flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  咨询此IP
                </Link>
                {product.datasheet_url && (
                  <a
                    href={product.datasheet_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    下载Datasheet
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Vendor Card */}
            <div className="lg:w-80">
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 mb-4">供应商信息</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-500">供应商代号</p>
                    <p className="font-medium text-slate-900">{product.vendor_code}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">地区</p>
                    <p className="font-medium text-slate-900">{product.vendor_region}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">工艺节点</p>
                    <p className="font-medium text-slate-900">{product.process_node}</p>
                  </div>
                  {product.competitor_ref && (
                    <div>
                      <p className="text-sm text-slate-500">竞品参考</p>
                      <p className="font-medium text-slate-900">{product.competitor_ref}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-12">
        <div className="container-max section-padding">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">技术规格</h2>
          
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-6 py-4 bg-slate-50 text-sm font-medium text-slate-700 w-1/3">
                    接口类型
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">{product.interface_type}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 bg-slate-50 text-sm font-medium text-slate-700">
                    支持标准
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">
                    <div className="flex flex-wrap gap-2">
                      {product.compliance.map((std) => (
                        <span key={std} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                          {std}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 bg-slate-50 text-sm font-medium text-slate-700">
                    最高频率
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">{product.max_frequency_mhz} MHz</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 bg-slate-50 text-sm font-medium text-slate-700">
                    面积
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">
                    {product.area_value} {product.area_unit}
                    <span className="text-slate-500 ml-2">({product.area_config})</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 bg-slate-50 text-sm font-medium text-slate-700">
                    动态功耗
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">
                    {product.power_dynamic_mw} mW
                    <span className="text-slate-500 ml-2">({product.power_config})</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 bg-slate-50 text-sm font-medium text-slate-700">
                    漏电功耗
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">{product.power_leakage_mw} mW</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 bg-slate-50 text-sm font-medium text-slate-700">
                    工艺节点
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">{product.process_node}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-slate-500 mt-4">
            * 所有PPA数据均标注基准测试条件，确保可比性。数据来源于供应商Datasheet，仅供参考，最终以下载规格书为准。
          </p>
        </div>
      </section>

      {/* Deliverables & Certifications */}
      <section className="py-12 bg-white">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Deliverables */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">交付清单</h2>
              <div className="bg-slate-50 rounded-xl p-6">
                <div className="grid grid-cols-2 gap-4">
                  {product.deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">认证信息</h2>
              <div className="bg-slate-50 rounded-xl p-6">
                <div className="space-y-3">
                  {product.certification.map((cert) => (
                    <div key={cert} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-slate-700 font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar IPs */}
      {similarIPs.length > 0 && (
        <section className="py-12">
          <div className="container-max section-padding">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">相似IP推荐</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarIPs.map((ip) => (
                <Link
                  key={ip.id}
                  href={`/ip/${ip.id}`}
                  className="bg-white border border-slate-200 rounded-xl p-6 card-hover"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">
                      {ip.vendor_code}
                    </span>
                    <span className="text-xs text-slate-500">{ip.vendor_region}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{ip.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span>{ip.max_frequency_mhz} MHz</span>
                    <span>{ip.area_value} {ip.area_unit}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container-max section-padding">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">咨询此IP</h2>
              <p className="text-slate-600">
                对 {product.name} 感兴趣？填写表单，我们将在24小时内与您联系
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6">
              <ContactForm selectedIPs={[product]} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
