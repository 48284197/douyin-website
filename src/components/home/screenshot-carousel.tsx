'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface Screenshot {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

export interface ScreenshotCarouselProps {
  screenshots?: Screenshot[];
  className?: string;
}

// 默认截图数据（占位符）
const defaultScreenshots: Screenshot[] = [
  {
    id: '1',
    url: '/screenshots/main-interface.jpg',
    alt: '主界面截图',
    caption: '简洁直观的主界面，一目了然的功能布局',
  },
  {
    id: '2',
    url: '/screenshots/danmu-monitor.jpg',
    alt: '弹幕监听界面',
    caption: '实时弹幕监听，智能关键词识别',
  },
  {
    id: '3',
    url: '/screenshots/interaction-effects.jpg',
    alt: '互动效果展示',
    caption: '丰富的互动效果，让直播更生动',
  },
  {
    id: '4',
    url: '/screenshots/settings-panel.jpg',
    alt: '设置面板',
    caption: '灵活的配置选项，满足个性化需求',
  },
];

const ScreenshotCarousel = React.forwardRef<HTMLElement, ScreenshotCarouselProps>(
  ({ screenshots = defaultScreenshots, className }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

    // 自动轮播
    React.useEffect(() => {
      if (!isAutoPlaying) return;

      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);

      return () => clearInterval(interval);
    }, [isAutoPlaying, screenshots.length]);

    const goToPrevious = () => {
      setIsAutoPlaying(false);
      setCurrentIndex(currentIndex === 0 ? screenshots.length - 1 : currentIndex - 1);
    };

    const goToNext = () => {
      setIsAutoPlaying(false);
      setCurrentIndex(currentIndex === screenshots.length - 1 ? 0 : currentIndex + 1);
    };

    const goToSlide = (index: number) => {
      setIsAutoPlaying(false);
      setCurrentIndex(index);
    };

    return (
      <section
        ref={ref}
        className={`py-20 sm:py-32 bg-gray-50 ${className}`}
      >
        <div className="container mx-auto px-4">
          {/* 标题部分 */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              软件界面预览
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              直观了解软件功能和界面设计
            </p>
          </div>

          {/* 轮播容器 */}
          <div className="relative mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
              {/* 图片容器 */}
              <div className="relative aspect-video">
                {screenshots.map((screenshot, index) => (
                  <div
                    key={screenshot.id}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {/* 占位符图片 - 实际项目中应该使用真实截图 */}
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="text-center">
                        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-2xl">📱</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                          {screenshot.alt}
                        </h3>
                        <p className="text-gray-500 max-w-md">
                          {screenshot.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 导航按钮 */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
                onClick={goToPrevious}
                aria-label="上一张"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
                onClick={goToNext}
                aria-label="下一张"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* 指示器 */}
            <div className="mt-8 flex justify-center space-x-2">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-blue-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`跳转到第 ${index + 1} 张图片`}
                />
              ))}
            </div>

            {/* 当前图片说明 */}
            <div className="mt-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {screenshots[currentIndex]?.alt}
              </h3>
              {screenshots[currentIndex]?.caption && (
                <p className="mt-2 text-gray-600">
                  {screenshots[currentIndex].caption}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
);
ScreenshotCarousel.displayName = 'ScreenshotCarousel';

export { ScreenshotCarousel };