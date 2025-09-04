'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, MessageSquare, ThumbsUp } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'download' | 'idea' | 'comment' | 'like';
  title: string;
  description: string;
  date: Date;
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'download',
    title: '下载了软件',
    description: '下载了 Windows 版本 v1.2.3',
    date: new Date(2023, 5, 15)
  },
  {
    id: '2',
    type: 'idea',
    title: '提交了想法',
    description: '提交了想法：添加自定义弹幕颜色功能',
    date: new Date(2023, 5, 10)
  },
  {
    id: '3',
    type: 'comment',
    title: '评论了想法',
    description: '评论了想法：这个功能非常实用！',
    date: new Date(2023, 5, 5)
  },
  {
    id: '4',
    type: 'download',
    title: '下载了软件',
    description: '下载了 Mac 版本 v1.2.2',
    date: new Date(2023, 4, 28)
  },
  {
    id: '5',
    type: 'like',
    title: '点赞了想法',
    description: '点赞了想法：添加多账号切换功能',
    date: new Date(2023, 4, 20)
  },
];

export function ActivityHistory() {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'download':
        return <Download className="h-4 w-4" />;
      case 'idea':
        return <FileText className="h-4 w-4" />;
      case 'comment':
        return <MessageSquare className="h-4 w-4" />;
      case 'like':
        return <ThumbsUp className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'download':
        return 'bg-blue-100 text-blue-700';
      case 'idea':
        return 'bg-purple-100 text-purple-700';
      case 'comment':
        return 'bg-green-100 text-green-700';
      case 'like':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="border-b pb-6">
        <CardTitle className="text-2xl font-bold text-gray-800">活动历史</CardTitle>
        <CardDescription className="text-gray-600">查看您的最近活动记录</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="downloads">下载</TabsTrigger>
            <TabsTrigger value="ideas">想法</TabsTrigger>
            <TabsTrigger value="interactions">互动</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="space-y-4">
              {mockActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 border-b border-gray-100 pb-4">
                  <div className={`rounded-full p-2 ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{activity.title}</h4>
                      <span className="text-xs text-gray-500">{formatDate(activity.date)}</span>
                    </div>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="downloads" className="mt-0">
            <div className="space-y-4">
              {mockActivities
                .filter(activity => activity.type === 'download')
                .map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 border-b border-gray-100 pb-4">
                    <div className={`rounded-full p-2 ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{activity.title}</h4>
                        <span className="text-xs text-gray-500">{formatDate(activity.date)}</span>
                      </div>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="ideas" className="mt-0">
            <div className="space-y-4">
              {mockActivities
                .filter(activity => activity.type === 'idea')
                .map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 border-b border-gray-100 pb-4">
                    <div className={`rounded-full p-2 ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{activity.title}</h4>
                        <span className="text-xs text-gray-500">{formatDate(activity.date)}</span>
                      </div>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="interactions" className="mt-0">
            <div className="space-y-4">
              {mockActivities
                .filter(activity => ['comment', 'like'].includes(activity.type))
                .map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 border-b border-gray-100 pb-4">
                    <div className={`rounded-full p-2 ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{activity.title}</h4>
                        <span className="text-xs text-gray-500">{formatDate(activity.date)}</span>
                      </div>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}