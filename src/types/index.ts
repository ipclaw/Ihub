// IP Product Type
export interface IPProduct {
  id: string;
  name: string;
  vendor_code: string;
  vendor_tier: 'Tier1' | 'Tier2' | 'Cost-effective';
  vendor_region: string;
  interface_type: string;
  process_node: string;
  max_frequency_mhz: number;
  area_value: number;
  area_unit: string;
  area_config: string;
  power_dynamic_mw: number;
  power_leakage_mw: number;
  power_config: string;
  compliance: string[];
  certification: string[];
  deliverables: string[];
  datasheet_url?: string;
  competitor_ref?: string;
  keywords: string[];
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  // Joined fields
  vendor?: Vendor;
}

// Vendor Type
export interface Vendor {
  id: string;
  code: string;
  region: string;
  tier: 'Tier1' | 'Tier2' | 'Cost-effective';
  specialties: string[];
  certification: string[];
  description: string;
  contact_note?: string;
}

// Inquiry Type
export interface Inquiry {
  id: string;
  customer_name: string;
  company: string;
  email: string;
  phone?: string;
  wechat_id?: string;
  message: string;
  interested_ips: string[];
  contact_method: 'email' | 'wechat' | 'both';
  status: 'pending' | 'contacted' | 'closed' | 'converted';
  follow_up_notes?: string;
  created_at: string;
}

// IP Configuration Type (Optional Extension)
export interface IPConfiguration {
  id: string;
  ip_id: string;
  config_name: string;
  area_value: number;
  power_value: number;
  frequency_mhz: number;
  notes?: string;
}

// Filter Options
export interface FilterOptions {
  interfaceType?: string;
  processNode?: string;
  vendorTier?: string;
  certification?: string;
}

// Comparison Item
export interface ComparisonItem {
  product: IPProduct;
  isBest?: {
    area?: boolean;
    power?: boolean;
    frequency?: boolean;
  };
}
