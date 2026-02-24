import { createClient } from '@supabase/supabase-js';
import { IPProduct, Vendor, Inquiry } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// IP Products API
export async function getIPProducts(filters?: {
  interfaceType?: string;
  processNode?: string;
  vendorTier?: string;
  certification?: string;
  search?: string;
}): Promise<IPProduct[]> {
  let query = supabase
    .from('ip_products')
    .select(`
      *,
      vendor:vendors(*)
    `)
    .eq('status', 'active');

  if (filters?.interfaceType) {
    query = query.eq('interface_type', filters.interfaceType);
  }
  if (filters?.processNode) {
    query = query.eq('process_node', filters.processNode);
  }
  if (filters?.vendorTier) {
    query = query.eq('vendor_tier', filters.vendorTier);
  }
  if (filters?.certification) {
    query = query.contains('certification', [filters.certification]);
  }
  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,interface_type.ilike.%${filters.search}%,keywords.cs.{${filters.search}}`);
  }

  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching IP products:', error);
    return [];
  }
  
  return data || [];
}

export async function getIPProductById(id: string): Promise<IPProduct | null> {
  const { data, error } = await supabase
    .from('ip_products')
    .select(`
      *,
      vendor:vendors(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching IP product:', error);
    return null;
  }

  return data;
}

export async function getSimilarIPs(ipProduct: IPProduct): Promise<IPProduct[]> {
  const { data, error } = await supabase
    .from('ip_products')
    .select(`
      *,
      vendor:vendors(*)
    `)
    .eq('interface_type', ipProduct.interface_type)
    .eq('status', 'active')
    .neq('id', ipProduct.id)
    .limit(3);

  if (error) {
    console.error('Error fetching similar IPs:', error);
    return [];
  }

  return data || [];
}

// Vendors API
export async function getVendors(): Promise<Vendor[]> {
  const { data, error } = await supabase
    .from('vendors')
    .select('*');

  if (error) {
    console.error('Error fetching vendors:', error);
    return [];
  }

  return data || [];
}

// Inquiry API
export async function createInquiry(inquiry: Omit<Inquiry, 'id' | 'created_at'>): Promise<Inquiry | null> {
  const { data, error } = await supabase
    .from('inquiries')
    .insert([inquiry])
    .select()
    .single();

  if (error) {
    console.error('Error creating inquiry:', error);
    return null;
  }

  return data;
}

// Get filter options
export async function getFilterOptions(): Promise<{
  interfaceTypes: string[];
  processNodes: string[];
  vendorTiers: string[];
  certifications: string[];
}> {
  const { data: products, error } = await supabase
    .from('ip_products')
    .select('interface_type, process_node, vendor_tier, certification')
    .eq('status', 'active');

  if (error || !products) {
    return {
      interfaceTypes: [],
      processNodes: [],
      vendorTiers: [],
      certifications: [],
    };
  }

  const interfaceTypes = Array.from(new Set(products.map(p => p.interface_type))).filter(Boolean);
  const processNodes = Array.from(new Set(products.map(p => p.process_node))).filter(Boolean);
  const vendorTiers = Array.from(new Set(products.map(p => p.vendor_tier))).filter(Boolean);
  const certifications = Array.from(new Set(products.flatMap(p => p.certification || []))).filter(Boolean);

  return {
    interfaceTypes,
    processNodes,
    vendorTiers,
    certifications,
  };
}
