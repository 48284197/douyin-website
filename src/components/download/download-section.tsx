'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { detectOS, getAllPlatforms, getPlatformInfo, type OSType } from './os-detector';
import { Download, Monitor, CheckCircle } from 'lucide-react';

interface DownloadLink {
  version: string;
  size: string;
  url: string;
  checksum: string;
}

interface DownloadData {
  windows: DownloadLink;
  'mac-intel': DownloadLink;
  'mac-m1': DownloadLink;
}

// 模拟下载数据 - 在实际应用中这些数据应该从API获取
const downloadData: DownloadData = {
  windows: {
    version: '1.2.3',
    size: '45.2 MB',
    url: 'https://github.com/example/douyin-live-interaction/releases/download/v1.2.3/douyin-live-interaction-windows-1.2.3.exe',
    checksum: 'sha256:a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456'
  },
  'mac-intel': {
    version: '1.2.3',
    size: '52.1 MB',
    url: 'https://github.com/example/douyin-live-interaction/releases/download/v1.2.3/douyin-live-interaction-mac-intel-1.2.3.dmg',
    checksum: 'sha256:f6e5d4c3b2a1098765432109876543210987654321fedcba0987654321fedcba'
  },
  'mac-m1': {
    version: '1.2.3',
    size: '48.7 MB',
    url: 'https://github.com/example/douyin-live-interaction/releases/download/v1.2.3/douyin-live-interaction-mac-m1-1.2.3.dmg',
    checksum: 'sha256:1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890'
  }
};

export function DownloadSection() {
  const [detectedOS, setDetectedOS] = useState<OSType>('unknown');
  // const [selectedPlatform, setSelectedPlatform] = useState<OSType>('windows');
  const [isDownloading, setIsDownloading] = useState<Record<OSType, boolean>>({
    windows: false,
    'mac-intel': false,
    'mac-m1': false,
    linux: false,
    unknown: false
  });

  useEffect(() => {
    const osInfo = detectOS();
    setDetectedOS(osInfo.type);
    // if (osInfo.type !== 'unknown' && osInfo.type !== 'linux') {
    //   setSelectedPlatform(osInfo.type);
    // }
  }, []);

  const handleDownload = async (platform: OSType) => {
    if (platform === 'linux' || platform === 'unknown') return;
    
    setIsDownloading(prev => ({ ...prev, [platform]: true }));
    
    try {
      // 尝试跟踪下载统计（如果API可用）
      try {
        await fetch('/api/downloads/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            platform,
            version: downloadData[platform].version,
            userAgent: navigator.userAgent,
          }),
        });
      } catch (trackError) {
        console.warn('下载统计跟踪失败，但下载将继续:', trackError);
      }

      // 开始下载
      const link = document.createElement('a');
      link.href = downloadData[platform].url;
      const fileExtension = platform === 'windows' ? '.exe' : '.dmg';
      link.download = `douyin-live-interaction-${platform}-${downloadData[platform].version}${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // 显示下载成功提示
      alert(`开始下载 ${getPlatformInfo(platform).name} 版本 ${downloadData[platform].version}`);
    } catch (error) {
      console.error('下载失败:', error);
      alert('下载失败，请稍后重试或联系技术支持');
    } finally {
      setIsDownloading(prev => ({ ...prev, [platform]: false }));
    }
  };

  const platforms = getAllPlatforms();
  const detectedPlatformInfo = getPlatformInfo(detectedOS);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            下载抖音直播互动软件
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            让直播互动更有趣，支持多平台安装
          </p>
          
          {detectedOS !== 'unknown' && (
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              <Monitor className="h-4 w-4" />
              <span>检测到您的系统：{detectedPlatformInfo.icon} {detectedPlatformInfo.name}</span>
            </div>
          )}
        </div>

        {/* 推荐下载 */}
        {detectedOS !== 'unknown' && detectedOS !== 'linux' && (
          <div className="mb-12">
            <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    推荐下载 {detectedPlatformInfo.icon} {detectedPlatformInfo.name}
                  </h2>
                  <p className="text-blue-100 mb-4">
                    版本 {downloadData[detectedOS].version} • {downloadData[detectedOS].size}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-blue-100">
                    <span>✓ 自动更新</span>
                    <span>✓ 数字签名</span>
                    <span>✓ 安全下载</span>
                  </div>
                </div>
                <Button
                  size="lg"
                  onClick={() => handleDownload(detectedOS)}
                  disabled={isDownloading[detectedOS]}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3"
                >
                  {isDownloading[detectedOS] ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent" />
                      <span>下载中...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Download className="h-5 w-5" />
                      <span>立即下载</span>
                    </div>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* 所有平台下载选项 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            选择您的平台
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {platforms.map((platform) => {
              const downloadInfo = downloadData[platform.type as keyof DownloadData];
              const isRecommended = platform.type === detectedOS;
              
              return (
                <Card 
                  key={platform.type} 
                  className={`p-6 relative ${
                    isRecommended ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-lg'
                  } transition-all duration-200`}
                >
                  {isRecommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        推荐
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className="text-4xl mb-3">{platform.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {platform.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      版本 {downloadInfo.version} • {downloadInfo.size}
                    </p>
                    
                    <Button
                      onClick={() => handleDownload(platform.type)}
                      disabled={isDownloading[platform.type]}
                      className="w-full"
                      variant={isRecommended ? "default" : "outline"}
                    >
                      {isDownloading[platform.type] ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                          <span>下载中...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Download className="h-4 w-4" />
                          <span>下载</span>
                        </div>
                      )}
                    </Button>
                    
                    <p className="text-xs text-gray-500 mt-2">
                      SHA256: {downloadInfo.checksum.substring(0, 16)}...
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 系统要求 */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">系统要求</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                🪟 Windows
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Windows 10 或更高版本</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>4GB RAM 或更多</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>100MB 可用磁盘空间</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                🍎 Mac (Intel)
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>macOS 10.15 或更高版本</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Intel 处理器</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>4GB RAM 或更多</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                🍎 Mac (Apple Silicon)
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>macOS 11.0 或更高版本</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Apple M1/M2 芯片</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>4GB RAM 或更多</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}