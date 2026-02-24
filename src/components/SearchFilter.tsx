'use client';

import { useState } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';

interface FilterOptions {
  interfaceType?: string;
  processNode?: string;
  vendorTier?: string;
  certification?: string;
}

interface SearchFilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onSearch: (search: string) => void;
  filterOptions: {
    interfaceTypes: string[];
    processNodes: string[];
    vendorTiers: string[];
    certifications: string[];
  };
}

export default function SearchFilter({
  filters,
  onFilterChange,
  onSearch,
  filterOptions,
}: SearchFilterProps) {
  const [searchValue, setSearchValue] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const clearFilters = () => {
    onFilterChange({});
    setSearchValue('');
    onSearch('');
  };

  const hasActiveFilters = Object.values(filters).some(Boolean) || searchValue;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="搜索IP名称、接口类型或关键词..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <button type="submit" className="btn-primary">
          搜索
        </button>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`btn-secondary flex items-center gap-2 ${showFilters ? 'bg-slate-100' : ''}`}
        >
          <Filter className="w-4 h-4" />
          筛选
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="btn-secondary text-red-600 border-red-200 hover:bg-red-50"
          >
            <X className="w-4 h-4" />
            清除
          </button>
        )}
      </form>

      {/* Filter Options */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-200 animate-fade-in">
          {/* Interface Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              接口类型
            </label>
            <select
              value={filters.interfaceType || ''}
              onChange={(e) =>
                onFilterChange({ ...filters, interfaceType: e.target.value || undefined })
              }
              className="input-field"
            >
              <option value="">全部</option>
              {filterOptions.interfaceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Process Node */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              工艺节点
            </label>
            <select
              value={filters.processNode || ''}
              onChange={(e) =>
                onFilterChange({ ...filters, processNode: e.target.value || undefined })
              }
              className="input-field"
            >
              <option value="">全部</option>
              {filterOptions.processNodes.map((node) => (
                <option key={node} value={node}>
                  {node}
                </option>
              ))}
            </select>
          </div>

          {/* Vendor Tier */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              供应商层级
            </label>
            <select
              value={filters.vendorTier || ''}
              onChange={(e) =>
                onFilterChange({ ...filters, vendorTier: e.target.value || undefined })
              }
              className="input-field"
            >
              <option value="">全部</option>
              {filterOptions.vendorTiers.map((tier) => (
                <option key={tier} value={tier}>
                  {tier}
                </option>
              ))}
            </select>
          </div>

          {/* Certification */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              认证状态
            </label>
            <select
              value={filters.certification || ''}
              onChange={(e) =>
                onFilterChange({ ...filters, certification: e.target.value || undefined })
              }
              className="input-field"
            >
              <option value="">全部</option>
              {filterOptions.certifications.map((cert) => (
                <option key={cert} value={cert}>
                  {cert}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-200">
          <span className="text-sm text-slate-500">已选筛选：</span>
          {searchValue && (
            <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">
              搜索: {searchValue}
            </span>
          )}
          {filters.interfaceType && (
            <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded">
              接口: {filters.interfaceType}
            </span>
          )}
          {filters.processNode && (
            <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded">
              工艺: {filters.processNode}
            </span>
          )}
          {filters.vendorTier && (
            <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded">
              层级: {filters.vendorTier}
            </span>
          )}
          {filters.certification && (
            <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded">
              认证: {filters.certification}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
