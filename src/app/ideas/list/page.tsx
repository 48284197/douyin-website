'use client';

import { Suspense } from 'react';
import { IdeasList } from '@/components/ideas/ideas-list';
import { Loading } from '@/components/ui/loading';
import { NavigationWithAuth } from '@/components/layout/navigation-with-auth';

export const dynamic = 'force-dynamic';

export default function IdeasListPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationWithAuth />
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            用户想法
          </h1>
          <p className="text-lg text-gray-600">
            这里展示了用户提交的所有创意想法和建议
          </p>
        </div>
        
        <Suspense fallback={
          <div className="flex justify-center items-center py-8">
            <Loading size="lg" />
          </div>
        }>
          <IdeasList />
        </Suspense>
        </div>
      </div>
    </div>
  );
}