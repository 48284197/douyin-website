'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface GuideStep {
  title: string;
  description: string;
  details?: string[];
  warning?: string;
}

interface PlatformGuide {
  platform: string;
  icon: string;
  steps: GuideStep[];
}

const installationGuides: PlatformGuide[] = [
  {
    platform: 'Windows',
    icon: '🪟',
    steps: [
      {
        title: '下载安装包',
        description: '点击上方下载按钮，下载适用于Windows的安装包',
        details: [
          '文件名格式：douyin-live-interaction-windows-x.x.x.exe',
          '文件大小约45MB',
          '支持Windows 10及以上版本'
        ]
      },
      {
        title: '运行安装程序',
        description: '双击下载的.exe文件开始安装',
        details: [
          '如果出现安全警告，点击"更多信息"然后选择"仍要运行"',
          '选择安装路径（推荐使用默认路径）',
          '等待安装完成，通常需要1-2分钟'
        ],
        warning: '首次运行可能需要管理员权限，请右键选择"以管理员身份运行"'
      },
      {
        title: '启动软件',
        description: '安装完成后，从开始菜单或桌面快捷方式启动软件',
        details: [
          '首次启动会进行初始化配置',
          '按照向导完成基本设置',
          '开始享受直播互动功能'
        ]
      }
    ]
  },
  {
    platform: 'Mac (Intel)',
    icon: '🍎',
    steps: [
      {
        title: '下载安装包',
        description: '下载适用于Intel Mac的.dmg安装包',
        details: [
          '文件名格式：douyin-live-interaction-mac-intel-x.x.x.dmg',
          '文件大小约52MB',
          '支持macOS 10.15及以上版本'
        ]
      },
      {
        title: '安装应用',
        description: '双击.dmg文件，将应用拖拽到Applications文件夹',
        details: [
          '打开下载的.dmg文件',
          '将应用图标拖拽到Applications文件夹',
          '等待复制完成'
        ],
        warning: '由于macOS安全策略，首次运行可能需要在"系统偏好设置 > 安全性与隐私"中允许运行'
      },
      {
        title: '启动应用',
        description: '从Applications文件夹或Launchpad启动应用',
        details: [
          '首次启动可能需要输入管理员密码',
          '完成初始设置向导',
          '开始使用直播互动功能'
        ]
      }
    ]
  },
  {
    platform: 'Mac (Apple Silicon)',
    icon: '🍎',
    steps: [
      {
        title: '下载安装包',
        description: '下载专为Apple Silicon优化的.dmg安装包',
        details: [
          '文件名格式：douyin-live-interaction-mac-m1-x.x.x.dmg',
          '文件大小约49MB',
          '支持macOS 11.0及以上版本',
          '原生支持M1/M2芯片，性能更佳'
        ]
      },
      {
        title: '安装应用',
        description: '双击.dmg文件，将应用拖拽到Applications文件夹',
        details: [
          '打开下载的.dmg文件',
          '将应用图标拖拽到Applications文件夹',
          '等待复制完成'
        ],
        warning: '首次运行时，系统可能会询问是否允许运行来自未知开发者的应用，请在系统设置中允许'
      },
      {
        title: '启动应用',
        description: '从Applications文件夹或Launchpad启动应用',
        details: [
          '享受原生Apple Silicon性能',
          '完成初始设置向导',
          '开始使用直播互动功能'
        ]
      }
    ]
  }
];

export function InstallationGuide() {
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const togglePlatform = (platform: string) => {
    setExpandedPlatform(expandedPlatform === platform ? null : platform);
    setExpandedStep(null);
  };

  const toggleStep = (stepKey: string) => {
    setExpandedStep(expandedStep === stepKey ? null : stepKey);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            安装指导
          </h2>
          <p className="text-xl text-gray-600">
            按照以下步骤快速安装和使用抖音直播互动软件
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {installationGuides.map((guide) => (
            <Card key={guide.platform} className="mb-6 overflow-hidden">
              <Button
                variant="ghost"
                onClick={() => togglePlatform(guide.platform)}
                className="w-full p-6 justify-between text-left hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{guide.icon}</span>
                  <span className="text-xl font-semibold text-gray-900">
                    {guide.platform} 安装指南
                  </span>
                </div>
                {expandedPlatform === guide.platform ? (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                )}
              </Button>

              {expandedPlatform === guide.platform && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    {guide.steps.map((step, stepIndex) => {
                      const stepKey = `${guide.platform}-${stepIndex}`;

                      return (
                        <div key={stepIndex} className="border-l-4 border-blue-200 pl-4">
                          <Button
                            variant="ghost"
                            onClick={() => toggleStep(stepKey)}
                            className="w-full justify-between text-left p-3 hover:bg-blue-50"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                                {stepIndex + 1}
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  {step.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {step.description}
                                </p>
                              </div>
                            </div>
                            {expandedStep === stepKey ? (
                              <ChevronDown className="h-4 w-4 text-gray-500" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-gray-500" />
                            )}
                          </Button>

                          {expandedStep === stepKey && (
                            <div className="mt-3 ml-11 space-y-3">
                              {step.details && (
                                <div className="bg-blue-50 p-4 rounded-lg">
                                  <div className="flex items-start space-x-2">
                                    <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <h4 className="font-medium text-blue-900 mb-2">详细步骤：</h4>
                                      <ul className="space-y-1">
                                        {step.details.map((detail, detailIndex) => (
                                          <li key={detailIndex} className="flex items-start space-x-2 text-sm text-blue-800">
                                            <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <span>{detail}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {step.warning && (
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                  <div className="flex items-start space-x-2">
                                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <h4 className="font-medium text-yellow-900 mb-1">注意事项：</h4>
                                      <p className="text-sm text-yellow-800">{step.warning}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* 常见问题 */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            常见问题
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                ❓ 如何确认下载的文件是安全的？
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                每个下载文件都提供SHA256校验码，您可以使用以下方法验证：
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Windows: 使用 <code className="bg-gray-100 px-1 rounded">certutil -hashfile filename SHA256</code></li>
                <li>• Mac: 使用 <code className="bg-gray-100 px-1 rounded">shasum -a 256 filename</code></li>
              </ul>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                🔄 软件会自动更新吗？
              </h4>
              <p className="text-sm text-gray-600">
                是的，软件内置自动更新功能。当有新版本发布时，软件会提示您更新。
                您也可以在设置中关闭自动更新，手动检查更新。
              </p>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                💻 系统兼容性问题？
              </h4>
              <p className="text-sm text-gray-600">
                如果您的系统版本较旧，可能无法运行最新版本。请确保您的系统满足最低要求，
                或联系我们获取兼容版本。
              </p>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                🛠️ 安装失败怎么办？
              </h4>
              <p className="text-sm text-gray-600">
                请尝试以管理员权限运行安装程序，关闭杀毒软件，或重新下载安装包。
                如问题持续，请联系技术支持。
              </p>
            </Card>
          </div>
        </div>

        {/* 技术支持 */}
        <div className="mt-12 text-center">
          <Card className="p-8 bg-gradient-to-r from-gray-50 to-blue-50">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              需要帮助？
            </h3>
            <p className="text-gray-600 mb-6">
              如果您在安装过程中遇到任何问题，我们的技术支持团队随时为您提供帮助
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" onClick={() => window.location.href = '/help'}>
                查看帮助文档
              </Button>
              <Button onClick={() => window.location.href = '/contact'}>
                联系技术支持
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}