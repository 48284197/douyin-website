'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';

import { Play, MessageCircle, Zap, Users } from 'lucide-react';

export interface UseCaseSectionProps {
  className?: string;
}

const UseCaseSection = React.forwardRef<HTMLElement, UseCaseSectionProps>(
  ({ className }, ref) => {
    const [activeStep, setActiveStep] = React.useState(0);

    const steps = [
      {
        id: 1,
        title: '观众发送弹幕',
        description: '观众在直播间发送"鱼叉插鱼饲料"',
        icon: <MessageCircle className="h-6 w-6" />,
        color: 'bg-blue-500',
      },
      {
        id: 2,
        title: '系统智能识别',
        description: '软件实时监听并识别关键词',
        icon: <Zap className="h-6 w-6" />,
        color: 'bg-yellow-500',
      },
      {
        id: 3,
        title: '触发互动效果',
        description: '自动执行鱼叉插鱼饲料动作',
        icon: <Play className="h-6 w-6" />,
        color: 'bg-green-500',
      },
      {
        id: 4,
        title: '观众参与互动',
        description: '更多观众被吸引参与互动',
        icon: <Users className="h-6 w-6" />,
        color: 'bg-purple-500',
      },
    ];

    React.useEffect(() => {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 3000);

      return () => clearInterval(interval);
    }, [steps.length]);

    const miniWindow = () => {
          window.open(window.location.href,'抖音',"width=500,height=900,right=0,top=0")
    };


    return (
      <section
        ref={ref}
        className={`py-20 sm:py-32 bg-gradient-to-br from-blue-50 to-purple-50 ${className}`}
      >
        <div className="container mx-auto px-4">
          {/* 标题部分 */}
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              经典使用案例
            </h2>
            <h2 onClick={miniWindow} className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              小窗模式
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              以&ldquo;鱼叉插鱼饲料&rdquo;为例，看看软件如何让直播互动变得生动有趣
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* 左侧：使用流程 */}
            <div className="space-y-8">
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-start space-x-4 transition-all duration-500 ${
                      activeStep === index
                        ? 'scale-105 opacity-100'
                        : 'scale-100 opacity-70'
                    }`}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-white transition-all duration-500 ${
                        activeStep === index ? step.color : 'bg-gray-400'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 进度指示器 */}
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                      activeStep === index ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 右侧：效果展示 */}
            <div className="relative">
              <Card className="overflow-hidden border-0 shadow-2xl">
                <CardContent className="p-0">
                  {/* 模拟直播界面 */}
                  <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 relative">
                    {/* 直播画面区域 */}
                    <div className="absolute inset-4 rounded-lg bg-gradient-to-br from-blue-900 to-purple-900 overflow-hidden">
                      {/* 模拟游戏画面 */}
                      <div className="h-full w-full relative flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-6xl mb-4">🎣</div>
                          <div className="text-lg font-semibold">鱼叉插鱼饲料</div>
                          <div className="text-sm opacity-75 mt-2">互动效果演示</div>
                        </div>
                        
                        {/* 动画效果 */}
                        {activeStep === 2 && (
                          <div className="absolute inset-0 bg-yellow-400/20 animate-pulse rounded-lg" />
                        )}
                      </div>
                    </div>

                    {/* 弹幕区域 */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 space-y-2">
                        <div className="text-white text-sm">
                          <span className="text-blue-400">观众123:</span> 鱼叉插鱼饲料
                        </div>
                        {activeStep >= 1 && (
                          <div className="text-white text-sm animate-fade-in">
                            <span className="text-green-400">观众456:</span> 哇，太有趣了！
                          </div>
                        )}
                        {activeStep >= 3 && (
                          <div className="text-white text-sm animate-fade-in">
                            <span className="text-purple-400">观众789:</span> 我也要试试！
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 装饰元素 */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-200 opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-purple-200 opacity-20 animate-pulse"></div>
            </div>
          </div>

          {/* 底部说明 */}
          <div className="mt-16 text-center">
            <div className="mx-auto max-w-2xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                为什么选择我们的互动方案？
              </h3>
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="font-medium text-gray-900">毫秒响应</div>
                  <div className="text-sm text-gray-600">实时处理弹幕指令</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="font-medium text-gray-900">精准识别</div>
                  <div className="text-sm text-gray-600">智能关键词匹配</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🚀</div>
                  <div className="font-medium text-gray-900">简单易用</div>
                  <div className="text-sm text-gray-600">一键启动，无需复杂配置</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);
UseCaseSection.displayName = 'UseCaseSection';

export { UseCaseSection };