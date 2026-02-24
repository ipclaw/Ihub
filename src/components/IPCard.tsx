'use client';

import Link from 'next/link';
import { IPProduct } from '@/types';
import { 
  Cpu, 
  Zap, 
  Maximize, 
  Award, 
  ArrowRight,
  Scale
} from 'lucide-react';

interface IPCardProps {
  product: IPProduct;
  isCompared?: boolean;
  onCompareToggle?: (product: IPProduct) => void;
}

export default function IPCard({ product, isCompared, onCompareToggle }: IPCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 card-hover">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded">
              {product.vendor_tier}
            </span>
            <span className="text-xs text-slate-500">{product.vendor_region}</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
          <p className="text-sm text-slate-500">{product.vendor?.description || product.vendor_code}</p>
        </div>
        {onCompareToggle && (
          <button
            onClick={() => onCompareToggle(product)}
            className={`p-2 rounded-lg transition-colors ${
              isCompared
                ? 'bg-blue-100 text-blue-600'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title={isCompared ? '取消对比' : '加入对比'}
          >
            <Scale className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Key Specs */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-slate-50 rounded-lg">
          <Zap className="w-5 h-5 text-amber-500 mx-auto mb-1" />
          <p className="text-lg font-semibold text-slate-900">{product.max_frequency_mhz}</p>
          <p className="text-xs text-slate-500">MHz</p>
        </div>
        <div className="text-center p-3 bg-slate-50 rounded-lg">
          <Maximize className="w-5 h-5 text-blue-500 mx-auto mb-1" />
          <p className="text-lg font-semibold text-slate-900">{product.area_value}</p>
          <p className="text-xs text-slate-500">{product.area_unit}</p>
        </div>
        <div className="text-center p-3 bg-slate-50 rounded-lg">
          <Cpu className="w-5 h-5 text-green-500 mx-auto mb-1" />
          <p className="text-lg font-semibold text-slate-900">{product.power_dynamic_mw}</p>
          <p className="text-xs text-slate-500">mW</p>
        </div>
      </div>

      {/* Specs Detail */}
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">工艺节点</span>
          <span className="font-medium text-slate-900">{product.process_node}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">接口类型</span>
          <span className="font-medium text-slate-900">{product.interface_type}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">面积条件</span>
          <span className="text-slate-600 text-right text-xs max-w-[60%]">{product.area_config}</span>
        </div>
      </div>

      {/* Certifications */}
      {product.certification && product.certification.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {product.certification.slice(0, 3).map((cert) => (
            <span
              key={cert}
              className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-green-50 text-green-700 rounded"
            >
              <Award className="w-3 h-3" />
              {cert}
            </span>
          ))}
        </div>
      )}

      {/* Deliverables */}
      <div className="flex flex-wrap gap-1 mb-4">
        {product.deliverables.slice(0, 4).map((item) => (
          <span
            key={item}
            className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Action */}
      <Link
        href={`/ip/${product.id}`}
        className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
      >
        查看详情
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
