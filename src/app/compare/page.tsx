import { Suspense } from 'react';
import CompareContent from './CompareContent';

export const metadata = {
  title: 'IP产品对比 - IP Hub',
  description: '对比多个IP产品的PPA参数，找到最适合您的Memory IP方案',
};

export default function ComparePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-slate-50">
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
      </main>
    }>
      <CompareContent />
    </Suspense>
  );
}
