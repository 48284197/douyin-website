'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MessageSquare, 
  Zap, 
  Settings, 
  Users, 
  Heart, 
  Gift,
  Gamepad2,
  Sparkles
} from 'lucide-react';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export interface FeaturesSectionProps {
  className?: string;
}

const features: Feature[] = [
  {
    id: '1',
    title: '智能弹幕识别',
    description: '实时监听直播间弹幕，智能识别关键词和指令，支持自定义关键词配置',
    icon: <MessageSquare className="h-6 w-6" />,
    color: 'text-blue-600 bg-blue-100',
  },
  {
    id: '2',
    title: '即时互动响应',
    description: '毫秒级响应速度，观众发送指令后立即触发对应的互动效果',
    icon: <Zap className="h-6 w-6" />,
    color: 'text-yellow-600 bg-yellow-100',
  },
  {
    id: '3',
    title: '丰富互动效果',
    description: '支持多种互动方式：鱼叉插鱼饲料、礼物特效、音效播放等',
    icon: <Sparkles className="h-6 w-6" />,
    color: 'text-purple-600 bg-purple-100',
  },
  {
    id: '4',
    title: '自定义配置',
    description: '灵活的配置选项，可自定义关键词、互动效果、触发条件等',
    icon: <Settings className="h-6 w-6" />,
    color: 'text-green-600 bg-green-100',
  },
  {
    id: '5',
    title: '观众参与度提升',
    description: '通过有趣的互动机制，显著提高观众的参与度和直播间活跃度',
    icon: <Users className="h-6 w-6" />,
    color: 'text-indigo-600 bg-indigo-100',
  },
  {
    id: '6',
    title: '多样化游戏模式',
    description: '内置多种小游戏和互动模式，让直播内容更加丰富多彩',
    icon: <Gamepad2 className="h-6 w-6" />,
    color: 'text-red-600 bg-red-100',
  },
];

const FeaturesSection = React.forwardRef<HTMLElement, FeaturesSectionProps>(
  ({ className }, ref) => {
    return (
      <section
        ref={ref}
        className={`py-20 sm:py-32 ${className}`}
      >
        <div className="container mx-auto px-4">
          {/* 标题部分 */}
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              强大功能，让直播更精彩
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              专为抖音直播打造的互动工具，让每一次直播都充满惊喜
            </p>
          </div>

          {/* 功能卡片网格 */}
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card 
                key={feature.id} 
                className="group relative overflow-hidden border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <CardHeader className="pb-4">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.color} mb-4`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                
                {/* 悬停效果 */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Card>
            ))}
          </div>

          {/* 底部统计数据 */}
          <div className="mt-20 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 sm:text-4xl">10K+</div>
              <div className="mt-2 text-sm text-gray-600">活跃用户</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 sm:text-4xl">50+</div>
              <div className="mt-2 text-sm text-gray-600">互动效果</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 sm:text-4xl">99.9%</div>
              <div className="mt-2 text-sm text-gray-600">稳定性</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 sm:text-4xl">24/7</div>
              <div className="mt-2 text-sm text-gray-600">技术支持</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);
FeaturesSection.displayName = 'FeaturesSection';

export { FeaturesSection };