'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import IPCard from '@/components/IPCard';
import SearchFilter from '@/components/SearchFilter';
import ContactForm from '@/components/ContactForm';
import { IPProduct, FilterOptions } from '@/types';
import { 
  getMockIPProducts, 
  getMockFilterOptions,
  mockIPProducts 
} from '@/lib/mock-data';
import { 
  Cpu, 
  Scale, 
  Zap, 
  Shield, 
  ArrowRight,
  MessageCircle
} from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<IPProduct[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    interfaceTypes: [] as string[],
    processNodes: [] as string[],
    vendorTiers: [] as string[],
    certifications: [] as string[],
  });
  const [compareList, setCompareList] = useState<IPProduct[]>([]);

  useEffect(() => {
    // Load initial data
    const initialProducts = getMockIPProducts();
    setProducts(initialProducts);
    
    const options = getMockFilterOptions();
    setFilterOptions(options);
  }, []);

  useEffect(() => {
    // Apply filters
    const filtered = getMockIPProducts({
      ...filters,
      search: searchQuery,
    });
    setProducts(filtered);
  }, [filters, searchQuery]);

  const handleCompareToggle = (product: IPProduct) => {
    setCompareList((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 5) {
        alert('最多可同时对比5个IP');
        return prev;
      }
      return [...prev, product];
    });
  };

  const isInCompareList = (product: IPProduct) => {
    return compareList.some((p) => p.id === product.id);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container-max section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm mb-6">
              <Cpu className="w-4 h-4" />
              独立IP选型顾问平台
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              找到最适合的
              <span className="gradient-text"> Memory IP</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8">
              中立对比多家IP供应商PPA参数，降低选型成本，加速决策进程。
              <br className="hidden md:block" />
              不绑定任何供应商，只推荐最适合您的方案。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#products" className="btn-primary flex items-center justify-center gap-2">
                浏览IP产品
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#contact" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20 flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                免费咨询
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <p className="text-3xl font-bold text-blue-400">{mockIPProducts.length}+</p>
              <p className="text-sm text-slate-400">IP产品</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <p className="text-3xl font-bold text-green-400">5+</p>
              <p className="text-sm text-slate-400">供应商</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <p className="text-3xl font-bold text-amber-400">100%</p>
              <p className="text-sm text-slate-400">中立客观</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <p className="text-3xl font-bold text-purple-400">24h</p>
              <p className="text-sm text-slate-400">响应时间</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">为什么选择 IP Hub</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              我们致力于为中立的IP选型服务，帮助芯片设计公司找到最优的Memory IP方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Scale className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">中立对比</h3>
              <p className="text-slate-600">
                不绑定任何供应商，客观对比PPA参数，最优值自动标绿展示，让您一目了然。
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">加速决策</h3>
              <p className="text-slate-600">
                结构化PPA数据，带基准测试条件说明，确保可比性，缩短选型周期50%以上。
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">专业可信</h3>
              <p className="text-slate-600">
                供应商画像展示，TSMC OIP等认证信息完整，数据来源于官方Datasheet。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="container-max section-padding">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">IP产品库</h2>
              <p className="text-slate-600">
                当前展示 {products.length} 个LPDDR5X/LPDDR5 IP产品
              </p>
            </div>
            {compareList.length > 0 && (
              <Link
                href={`/compare?ids=${compareList.map(p => p.id).join(',')}`}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Scale className="w-5 h-5" />
                对比已选 ({compareList.length})
              </Link>
            )}
          </div>

          {/* Search & Filter */}
          <SearchFilter
            filters={filters}
            onFilterChange={setFilters}
            onSearch={setSearchQuery}
            filterOptions={filterOptions}
          />

          {/* Product Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <IPCard
                  key={product.id}
                  product={product}
                  isCompared={isInCompareList(product)}
                  onCompareToggle={handleCompareToggle}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">未找到匹配的IP产品</h3>
              <p className="text-slate-600">请尝试调整筛选条件或搜索关键词</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">联系咨询</h2>
                <p className="text-slate-600 mb-8">
                  有IP选型需求？填写表单，我们将在24小时内与您联系，
                  为您提供专业的IP选型建议。
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Cpu className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">专业咨询</h4>
                      <p className="text-sm text-slate-600">根据您的应用场景推荐最适合的IP方案</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Scale className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">PPA对比</h4>
                      <p className="text-sm text-slate-600">提供详细的PPA对比分析报告</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">供应商对接</h4>
                      <p className="text-sm text-slate-600">协助对接优质IP供应商，获取最优报价</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-slate-50 p-6 rounded-xl">
                <ContactForm selectedIPs={compareList} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Contact Button */}
      <Link
        href="#contact"
        className="fixed bottom-6 right-6 w-14 h-14 bg-slate-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-800 transition-colors z-40"
      >
        <MessageCircle className="w-6 h-6" />
      </Link>

      <Footer />
    </main>
  );
}
