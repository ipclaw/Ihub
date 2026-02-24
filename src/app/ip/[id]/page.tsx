import { mockIPProducts } from '@/lib/mock-data';
import IPDetailClient from './IPDetailClient';

// Generate static params for all IP products
export function generateStaticParams() {
  return mockIPProducts.map((product) => ({
    id: product.id,
  }));
}

// Generate metadata for each IP product
export function generateMetadata({ params }: { params: { id: string } }) {
  const product = mockIPProducts.find(p => p.id === params.id);
  
  if (!product) {
    return {
      title: 'IP产品未找到 - IP Hub',
    };
  }
  
  return {
    title: `${product.name} - ${product.vendor_code} | IP Hub选型平台`,
    description: `${product.interface_type} ${product.name}，工艺节点${product.process_node}，最高频率${product.max_frequency_mhz}MHz，面积${product.area_value}${product.area_unit}`,
  };
}

export default function IPDetailPage({ params }: { params: { id: string } }) {
  return <IPDetailClient id={params.id} />;
}
