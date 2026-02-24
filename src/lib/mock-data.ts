import { IPProduct, Vendor, Inquiry } from '@/types';

// Mock Vendors
export const mockVendors: Vendor[] = [
  {
    id: 'vendor-a',
    code: 'Vendor-A',
    region: '韩国',
    tier: 'Tier1',
    specialties: ['Memory IP', 'Interface IP'],
    certification: ['TSMC OIP', 'Samsung Foundry'],
    description: '韩国头部Memory IP供应商，TSMC OIP认证，专注LPDDR/DDR系列',
  },
  {
    id: 'vendor-b',
    code: 'Vendor-B',
    region: '台湾',
    tier: 'Tier1',
    specialties: ['Memory IP', 'Low Power IP'],
    certification: ['TSMC OIP', 'UMC'],
    description: '台湾领先IP厂商，连续8年台积电OIP合作伙伴，专注低功耗IP',
  },
  {
    id: 'vendor-c',
    code: 'Vendor-C',
    region: '美国',
    tier: 'Tier1',
    specialties: ['High Speed Interface', 'PCIe', 'USB', 'HBM'],
    certification: ['TSMC OIP', 'Intel Foundry'],
    description: '美国高速接口IP专家，PCIe/USB/HBM全栈支持',
  },
  {
    id: 'vendor-d',
    code: 'Vendor-D',
    region: '大陆',
    tier: 'Cost-effective',
    specialties: ['Memory IP', 'Interface IP'],
    certification: ['SMIC', 'HHGrace'],
    description: '国内新兴IP供应商，性价比高，支持本土工艺',
  },
  {
    id: 'vendor-e',
    code: 'Vendor-E',
    region: '韩国',
    tier: 'Tier2',
    specialties: ['Memory IP', 'Display IP'],
    certification: ['Samsung Foundry'],
    description: '韩国专业Memory IP供应商，专注中低端市场',
  },
];

// Mock IP Products
export const mockIPProducts: IPProduct[] = [
  {
    id: 'lpddr5x-ctrl-a',
    name: 'LPDDR5X Controller',
    vendor_code: 'Vendor-A',
    vendor_tier: 'Tier1',
    vendor_region: '韩国',
    interface_type: 'LPDDR5X',
    process_node: 'TSMC N5',
    max_frequency_mhz: 8533,
    area_value: 1.25,
    area_unit: 'mm²',
    area_config: '4通道, TSMC 5nm',
    power_dynamic_mw: 150,
    power_leakage_mw: 5,
    power_config: '8533Mbps, 25°C',
    compliance: ['LPDDR5', 'LPDDR5X'],
    certification: ['TSMC OIP', 'AEC-Q100'],
    deliverables: ['RTL', 'Netlist', 'Testbench', 'Docs', 'GDSII'],
    datasheet_url: '#',
    competitor_ref: '兼容Synopsys IP-X',
    keywords: ['LPDDR5X', 'Memory Controller', 'DFI 4.0', '低功耗', '手机SoC'],
    status: 'active',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    vendor: mockVendors[0],
  },
  {
    id: 'lpddr5x-phy-a',
    name: 'LPDDR5X PHY',
    vendor_code: 'Vendor-A',
    vendor_tier: 'Tier1',
    vendor_region: '韩国',
    interface_type: 'LPDDR5X',
    process_node: 'TSMC N5',
    max_frequency_mhz: 8533,
    area_value: 2.8,
    area_unit: 'mm²',
    area_config: '4通道, TSMC 5nm',
    power_dynamic_mw: 280,
    power_leakage_mw: 12,
    power_config: '8533Mbps, 25°C',
    compliance: ['LPDDR5', 'LPDDR5X'],
    certification: ['TSMC OIP', 'AEC-Q100'],
    deliverables: ['Netlist', 'GDSII', 'Testbench', 'Docs'],
    datasheet_url: '#',
    competitor_ref: '兼容Synopsys PHY-Y',
    keywords: ['LPDDR5X', 'PHY', '物理层', '高速接口'],
    status: 'active',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    vendor: mockVendors[0],
  },
  {
    id: 'lpddr5x-ctrl-b',
    name: 'LPDDR5X Controller',
    vendor_code: 'Vendor-B',
    vendor_tier: 'Tier1',
    vendor_region: '台湾',
    interface_type: 'LPDDR5X',
    process_node: 'TSMC N7',
    max_frequency_mhz: 8533,
    area_value: 1.45,
    area_unit: 'mm²',
    area_config: '4通道, TSMC 7nm',
    power_dynamic_mw: 165,
    power_leakage_mw: 6,
    power_config: '8533Mbps, 25°C',
    compliance: ['LPDDR5', 'LPDDR5X'],
    certification: ['TSMC OIP'],
    deliverables: ['RTL', 'Netlist', 'Testbench', 'Docs'],
    datasheet_url: '#',
    competitor_ref: '低功耗优化版本',
    keywords: ['LPDDR5X', 'Memory Controller', 'DFI 4.0', '低功耗'],
    status: 'active',
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z',
    vendor: mockVendors[1],
  },
  {
    id: 'lpddr5x-phy-b',
    name: 'LPDDR5X PHY',
    vendor_code: 'Vendor-B',
    vendor_tier: 'Tier1',
    vendor_region: '台湾',
    interface_type: 'LPDDR5X',
    process_node: 'TSMC N7',
    max_frequency_mhz: 8533,
    area_value: 3.2,
    area_unit: 'mm²',
    area_config: '4通道, TSMC 7nm',
    power_dynamic_mw: 310,
    power_leakage_mw: 15,
    power_config: '8533Mbps, 25°C',
    compliance: ['LPDDR5', 'LPDDR5X'],
    certification: ['TSMC OIP'],
    deliverables: ['Netlist', 'GDSII', 'Testbench', 'Docs'],
    datasheet_url: '#',
    competitor_ref: '低功耗PHY方案',
    keywords: ['LPDDR5X', 'PHY', '物理层', '低功耗'],
    status: 'active',
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z',
    vendor: mockVendors[1],
  },
  {
    id: 'lpddr5x-ctrl-c',
    name: 'LPDDR5X Controller',
    vendor_code: 'Vendor-C',
    vendor_tier: 'Tier1',
    vendor_region: '美国',
    interface_type: 'LPDDR5X',
    process_node: 'TSMC N5',
    max_frequency_mhz: 8533,
    area_value: 1.35,
    area_unit: 'mm²',
    area_config: '4通道, TSMC 5nm',
    power_dynamic_mw: 155,
    power_leakage_mw: 5.5,
    power_config: '8533Mbps, 25°C',
    compliance: ['LPDDR5', 'LPDDR5X'],
    certification: ['TSMC OIP', 'AEC-Q100'],
    deliverables: ['RTL', 'Netlist', 'Testbench', 'Docs', 'GDSII'],
    datasheet_url: '#',
    competitor_ref: '高性能版本',
    keywords: ['LPDDR5X', 'Memory Controller', '高性能', '汽车级'],
    status: 'active',
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z',
    vendor: mockVendors[2],
  },
  {
    id: 'lpddr5x-ctrl-d',
    name: 'LPDDR5X Controller',
    vendor_code: 'Vendor-D',
    vendor_tier: 'Cost-effective',
    vendor_region: '大陆',
    interface_type: 'LPDDR5X',
    process_node: 'SMIC N+1',
    max_frequency_mhz: 6400,
    area_value: 1.85,
    area_unit: 'mm²',
    area_config: '4通道, SMIC N+1',
    power_dynamic_mw: 190,
    power_leakage_mw: 8,
    power_config: '6400Mbps, 25°C',
    compliance: ['LPDDR5', 'LPDDR5X'],
    certification: ['SMIC'],
    deliverables: ['RTL', 'Netlist', 'Testbench', 'Docs'],
    datasheet_url: '#',
    competitor_ref: '高性价比方案',
    keywords: ['LPDDR5X', 'Memory Controller', '国产', '性价比'],
    status: 'active',
    created_at: '2024-02-10T00:00:00Z',
    updated_at: '2024-02-10T00:00:00Z',
    vendor: mockVendors[3],
  },
  {
    id: 'lpddr5-ctrl-e',
    name: 'LPDDR5 Controller',
    vendor_code: 'Vendor-E',
    vendor_tier: 'Tier2',
    vendor_region: '韩国',
    interface_type: 'LPDDR5',
    process_node: 'Samsung 8nm',
    max_frequency_mhz: 6400,
    area_value: 2.1,
    area_unit: 'mm²',
    area_config: '4通道, Samsung 8nm',
    power_dynamic_mw: 210,
    power_leakage_mw: 10,
    power_config: '6400Mbps, 25°C',
    compliance: ['LPDDR5'],
    certification: ['Samsung Foundry'],
    deliverables: ['RTL', 'Netlist', 'Testbench', 'Docs'],
    datasheet_url: '#',
    competitor_ref: '经济型方案',
    keywords: ['LPDDR5', 'Memory Controller', '经济型'],
    status: 'active',
    created_at: '2024-02-15T00:00:00Z',
    updated_at: '2024-02-15T00:00:00Z',
    vendor: mockVendors[4],
  },
  {
    id: 'lpddr5-phy-e',
    name: 'LPDDR5 PHY',
    vendor_code: 'Vendor-E',
    vendor_tier: 'Tier2',
    vendor_region: '韩国',
    interface_type: 'LPDDR5',
    process_node: 'Samsung 8nm',
    max_frequency_mhz: 6400,
    area_value: 4.2,
    area_unit: 'mm²',
    area_config: '4通道, Samsung 8nm',
    power_dynamic_mw: 380,
    power_leakage_mw: 20,
    power_config: '6400Mbps, 25°C',
    compliance: ['LPDDR5'],
    certification: ['Samsung Foundry'],
    deliverables: ['Netlist', 'GDSII', 'Testbench', 'Docs'],
    datasheet_url: '#',
    competitor_ref: '经济型PHY',
    keywords: ['LPDDR5', 'PHY', '经济型'],
    status: 'active',
    created_at: '2024-02-15T00:00:00Z',
    updated_at: '2024-02-15T00:00:00Z',
    vendor: mockVendors[4],
  },
];

// Mock Inquiries
export const mockInquiries: Inquiry[] = [];

// Helper functions for mock data
export function getMockIPProducts(filters?: {
  interfaceType?: string;
  processNode?: string;
  vendorTier?: string;
  certification?: string;
  search?: string;
}): IPProduct[] {
  let result = [...mockIPProducts];

  if (filters?.interfaceType) {
    result = result.filter(p => p.interface_type === filters.interfaceType);
  }
  if (filters?.processNode) {
    result = result.filter(p => p.process_node === filters.processNode);
  }
  if (filters?.vendorTier) {
    result = result.filter(p => p.vendor_tier === filters.vendorTier);
  }
  if (filters?.certification) {
    result = result.filter(p => p.certification?.includes(filters.certification!));
  }
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    result = result.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.interface_type.toLowerCase().includes(searchLower) ||
      p.keywords?.some(k => k.toLowerCase().includes(searchLower))
    );
  }

  return result;
}

export function getMockIPProductById(id: string): IPProduct | null {
  return mockIPProducts.find(p => p.id === id) || null;
}

export function getMockSimilarIPs(ipProduct: IPProduct): IPProduct[] {
  return mockIPProducts
    .filter(p => p.interface_type === ipProduct.interface_type && p.id !== ipProduct.id)
    .slice(0, 3);
}

export function getMockFilterOptions() {
  const interfaceTypes = Array.from(new Set(mockIPProducts.map(p => p.interface_type)));
  const processNodes = Array.from(new Set(mockIPProducts.map(p => p.process_node)));
  const vendorTiers = Array.from(new Set(mockIPProducts.map(p => p.vendor_tier)));
  const certifications = Array.from(new Set(mockIPProducts.flatMap(p => p.certification)));

  return {
    interfaceTypes,
    processNodes,
    vendorTiers,
    certifications,
  };
}
