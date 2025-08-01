import { Metadata } from 'next';
import { IdeasList } from '@/components/ideas/ideas-list';

export const metadata: Metadata = {
  title: '想法列表 - 抖音直播互动软件',
  description: '查看用户提交的创意想法和建议',
};

export default function IdeasListPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            用户想法
          </h1>
          <p className="text-lg text-gray-600">
            这里展示了用户提交的所有创意想法和建议
          </p>
        </div>
        
        <IdeasList />
      </div>
    </div>
  );
}