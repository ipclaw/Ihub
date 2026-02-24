'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { IPProduct } from '@/types';
import { getMockIPProductById } from '@/lib/mock-data';
import { 
  ArrowLeft, 
  Cpu, 
  Zap, 
  Maximize, 
  Download,
  X,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export default function CompareContent() {
  const searchParams = useSearchParams();
  const [compareList, setCompareList] = useState<IPProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = searchParams.get('ids')?.split(',') || [];
    const products = ids
      .map(id => getMockIPProductById(id))
      .filter((p): p is IPProduct => p !== null);
    setCompareList(products);
    setLoading(false);
  }, [searchParams]);

  // Calculate best/worst values
  const getValueClass = (value: number, key: 'area' | 'power' | 'frequency', products: IPProduct[]) => {
    const values = products.map(p => {
      if (key === 'area') return p.area_value;
      if (key === 'power') return p.power_dynamic_mw;
      return p.max_frequency_mhz;
    });
    
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    // For frequency, higher is better
    // For area and power, lower is better
    if (key === 'frequency') {
      if (value === max && products.length > 1) return 'value-best';
      if (value === min && products.length > 1) return 'value-worst';
    } else {
      if (value === min && products.length > 1) return 'value-best';
      if (value === max && products.length > 1) return 'value-worst';
    }
    return '';
  };

  const removeFromCompare = (id: string) => {
    const newList = compareList.filter(p => p.id !== id);
    setCompareList(newList);
    
    // Update URL
    const newIds = newList.map(p => p.id).join(',');
    if (newIds) {
      window.history.replaceState({}, '', `/compare?ids=${newIds}`);
    } else {
      window.history.replaceState({}, '', '/compare');
    }
  };

  const addMoreIPs = () => {
    window.location.href = '/#products';
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="container-max section-padding py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-96 bg-slate-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (compareList.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="container-max section-padding py-20 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Cpu className="w-8 h-8 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">暂无对比产品</h1>
          <p className="text-slate-600 mb-6">请先选择要对比的IP产品</p>
          <div className="flex gap-4 justify-center">
            <Link href="/" className="btn-primary">
              浏览IP产品
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="container-max section-padding">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                返回首页
              </Link>
              <h1 className="text-3xl font-bold text-slate-900">IP产品对比</h1>
              <p className="text-slate-600 mt-1">
                已选择 {compareList.length} 个产品进行对比
                {compareList.length < 5 && '（最多5个）'}
              </p>
            </div>
            <div className="flex gap-3">
              {compareList.length < 5 && (
                <button
                  onClick={addMoreIPs}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Cpu className="w-5 h-5" />
                  添加更多
                </button>
              )}
              <button
                onClick={() => alert('导出功能开发中')}
                className="btn-primary flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                导出报告
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-8 overflow-x-auto">
        <div className="container-max section-padding">
          <div className="min-w-[800px]">
            {/* Product Headers */}
            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}>
              <div className="font-semibold text-slate-900 p-4">对比项目</div>
              {compareList.map((product) => (
                <div key={product.id} className="bg-white rounded-xl p-4 border border-slate-200 relative">
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute top-2 right-2 p-1 hover:bg-slate-100 rounded"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                  <div className="text-xs text-slate-500 mb-1">{product.vendor_code}</div>
                  <h3 className="font-semibold text-slate-900 mb-2">{product.name}</h3>
                  <Link
                    href={`/ip/${product.id}`}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    查看详情 →
                  </Link>
                </div>
              ))}
            </div>

            {/* Basic Info */}
            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}>
              <div className="font-medium text-slate-700 p-4 bg-slate-100 rounded-lg">供应商层级</div>
              {compareList.map((product) => (
                <div key={product.id} className="p-4 bg-white rounded-lg border border-slate-200">
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm">
                    {product.vendor_tier}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}>
              <div className="font-medium text-slate-700 p-4 bg-slate-100 rounded-lg">地区</div>
              {compareList.map((product) => (
                <div key={product.id} className="p-4 bg-white rounded-lg border border-slate-200">
                  {product.vendor_region}
                </div>
              ))}
            </div>

            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}>
              <div className="font-medium text-slate-700 p-4 bg-slate-100 rounded-lg">工艺节点</div>
              {compareList.map((product) => (
                <div key={product.id} className="p-4 bg-white rounded-lg border border-slate-200">
                  {product.process_node}
                </div>
              ))}
            </div>

            {/* PPA Comparison */}
            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}>
              <div className="font-medium text-slate-700 p-4 bg-slate-100 rounded-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                最高频率 (MHz)
                <span className="text-xs text-green-600">↑优</span>
              </div>
              {compareList.map((product) => (
                <div key={product.id} className="p-4 bg-white rounded-lg border border-slate-200">
                  <span className={getValueClass(product.max_frequency_mhz, 'frequency', compareList)}>
                    {product.max_frequency_mhz}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}>
              <div className="font-medium text-slate-700 p-4 bg-slate-100 rounded-lg flex items-center gap-2">
                <Maximize className="w-5 h-5 text-blue-500" />
                面积 ({compareList[0]?.area_unit})
                <span className="text-xs text-green-600">↓优</span>
              </div>
              {compareList.map((product) => (
                <div key={product.id} className="p-4 bg-white rounded-lg border border-slate-200">
                  <span className={getValueClass(product.area_value, 'area', compareList)}>
                    {product.area_value}
                  </span>
                  <div className="text-xs text-slate-500 mt-1">{product.area_config}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}>
              <div className="font-medium text-slate-700 p-4 bg-slate-100 rounded-lg flex items-center gap-2">
                <Cpu className="w-5 h-5 text-green-500" />
                动态功耗 (mW)
                <span className="text-xs text-green-600">↓优</span>
              </div>
              {compareList.map((product) => (
                <div key={product.id} className="p-4 bg-white rounded-lg border border-slate-200">
                  <span className={getValueClass(product.power_dynamic_mw, 'power', compareList)}>
                    {product.power_dynamic_mw}
                  </span>
                  <div className="text-xs text-slate-500 mt-1">{product.power_config}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}>
              <div className="font-medium text-slate-700 p-4 bg-slate-100 rounded-lg">漏电功耗 (mW)</div>
              {compareList.map((product) => (
                <div key={product.id} className="p-4 bg-white rounded-lg border border-slate-200">
                  {product.power_leakage_mw}
                </div>
              ))}
            </div>

            {/* Compliance */}
            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}>
              <div className="font-medium text-slate-700 p-4 bg-slate-100 rounded-lg">支持标准</div>
              {compareList.map((product) => (
                <div key={product.id} className="p-4 bg-white rounded-lg border border-slate-200">
                  <div className="flex flex-wrap gap-1">
                    {product.compliance.map((std) => (
                      <span key={std} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                        {std}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}>
              <div className="font-medium text-slate-700 p-4 bg-slate-100 rounded-lg">认证状态</div>
              {compareList.map((product) => (
                <div key={product.id} className="p-4 bg-white rounded-lg border border-slate-200">
                  <div className="flex flex-wrap gap-1">
                    {product.certification.map((cert) => (
                      <span key={cert} className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Deliverables */}
            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}>
              <div className="font-medium text-slate-700 p-4 bg-slate-100 rounded-lg">交付物</div>
              {compareList.map((product) => (
                <div key={product.id} className="p-4 bg-white rounded-lg border border-slate-200">
                  <div className="flex flex-wrap gap-1">
                    {product.deliverables.map((item) => (
                      <span key={item} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}>
              <div className="font-medium text-slate-700 p-4 bg-slate-100 rounded-lg">操作</div>
              {compareList.map((product) => (
                <div key={product.id} className="p-4 bg-white rounded-lg border border-slate-200">
                  <Link
                    href={`/ip/${product.id}#contact`}
                    className="btn-primary w-full text-center text-sm py-2 block"
                  >
                    咨询此IP
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 p-4 bg-white rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-3">对比说明</h3>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="value-best">最优值</span>
                <span className="text-slate-600">该指标表现最佳</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="value-worst">最差值</span>
                <span className="text-slate-600">该指标表现最差</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-slate-600">越高越好</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-green-600" />
                <span className="text-slate-600">越低越好</span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-sm text-slate-500 mt-4">
            * 所有PPA数据均标注基准测试条件，确保可比性。数据来源于供应商Datasheet，仅供参考，最终以下载规格书为准。
            最优值/最差值标注基于当前对比组内的相对表现。
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
