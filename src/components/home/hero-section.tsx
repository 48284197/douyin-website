'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, Play, ArrowRight } from 'lucide-react';

export interface HeroSectionProps {
  className?: string;
}

const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  ({ className }, ref) => {
    return (
      <section
        ref={ref}
        className={`relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 sm:py-32 ${className}`}
      >
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* 左侧内容 */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  抖音直播
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    互动神器
                  </span>
                </h1>
                <p className="text-xl text-gray-600 sm:text-2xl">
                  让直播互动更有趣，让观众参与更深入
                </p>
                <p className="text-lg text-gray-500">
                  通过智能识别弹幕关键词，自动触发各种有趣的互动效果，
                  让你的直播间瞬间变得生动活泼，观众参与度倍增！
                </p>
              </div>

              {/* CTA 按钮 */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/download">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Download className="mr-2 h-5 w-5" />
                    立即下载
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Play className="mr-2 h-5 w-5" />
                  观看演示
                </Button>
              </div>

              {/* 特性标签 */}
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  免费使用
                </span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                  实时响应
                </span>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                  多平台支持
                </span>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800">
                  自定义配置
                </span>
              </div>
            </div>

            {/* 右侧图片/视频预览 */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 p-8">
                  {/* 软件界面预览占位符 */}
                  <div className="h-full w-full rounded-lg bg-white shadow-lg">
                    <div className="flex h-full flex-col">
                      {/* 模拟软件标题栏 */}
                      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <div className="h-3 w-3 rounded-full bg-red-400"></div>
                          <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                          <div className="h-3 w-3 rounded-full bg-green-400"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600">
                          抖音直播互动助手
                        </span>
                        <div className="w-16"></div>
                      </div>
                      
                      {/* 模拟软件内容 */}
                      <div className="flex-1 p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">弹幕监听状态</span>
                            <div className="flex items-center space-x-2">
                              <div className="h-2 w-2 rounded-full bg-green-400"></div>
                              <span className="text-xs text-green-600">已连接</span>
                            </div>
                          </div>
                          <div className="rounded-lg bg-gray-50 p-3">
                            <div className="text-xs text-gray-500 mb-2">最新弹幕</div>
                            <div className="space-y-1">
                              <div className="text-sm">用户123: 鱼叉插鱼饲料</div>
                              <div className="text-sm">观众456: 太有趣了！</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 装饰性元素 */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-200 opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-purple-200 opacity-20"></div>
            </div>
          </div>
        </div>

        {/* 背景装饰 */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 transform">
            <div className="h-[600px] w-[600px] rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl"></div>
          </div>
        </div>
      </section>
    );
  }
);
HeroSection.displayName = 'HeroSection';

export { HeroSection };