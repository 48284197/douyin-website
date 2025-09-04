import { Metadata } from 'next';
import { NavigationWithAuth } from '@/components/layout/navigation-with-auth';
import { DownloadSection } from '@/components/download/download-section';
import { InstallationGuide } from '@/components/download/installation-guide';

export const metadata: Metadata = {
  title: '下载 - 抖音直播互动软件',
  description: '下载抖音直播互动软件，支持Windows、Mac Intel和Mac M1芯片。让直播互动更有趣，让观众参与更深入。',
};

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 */}
      <NavigationWithAuth />
      
      {/* 主要内容 */}
      <main className="pt-16">
        {/* 下载区域 */}
        <DownloadSection />
        
        {/* 安装指导 */}
        <InstallationGuide />
      </main>
      
      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600" />
                <span className="text-xl font-bold">抖音直播互动</span>
              </div>
              <p className="text-gray-400 text-sm">
                让直播互动更有趣，让观众参与更深入
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">产品</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/download" className="hover:text-white transition-colors">下载软件</a></li>
                <li><a href="/features" className="hover:text-white transition-colors">功能介绍</a></li>
                <li><a href="/pricing" className="hover:text-white transition-colors">价格方案</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">支持</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/help" className="hover:text-white transition-colors">帮助中心</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">联系我们</a></li>
                <li><a href="/ideas" className="hover:text-white transition-colors">意见反馈</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">关于</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">关于我们</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">隐私政策</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">服务条款</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 抖音直播互动软件. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}