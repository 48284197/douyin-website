import { Metadata } from 'next';
import Link from 'next/link';
import { IdeaSubmissionForm } from '@/components/forms/idea-submission-form';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: '提交想法 - 抖音直播互动软件',
  description: '分享您对抖音直播互动软件的创意想法和建议',
};

export default function IdeasPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                提交您的创意想法
              </h1>
              <Link href="/ideas/list">
                <Button variant="outline">
                  查看所有想法
                </Button>
              </Link>
            </div>
            <p className="text-lg text-gray-600">
              我们非常重视用户的反馈和建议。请分享您对抖音直播互动软件的想法，帮助我们不断改进产品。
            </p>
          </div>
          
          <IdeaSubmissionForm />
        </div>
      </div>
    </div>
  );
}