'use client';

import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { User, Calendar, Tag, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { Idea } from '@/types';

interface IdeaCardProps {
  idea: Idea;
}

export function IdeaCard({ idea }: IdeaCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'implemented':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '待审核';
      case 'approved':
        return '已通过';
      case 'rejected':
        return '已拒绝';
      case 'implemented':
        return '已实现';
      default:
        return status;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '功能建议':
        return 'bg-purple-100 text-purple-800';
      case '界面优化':
        return 'bg-indigo-100 text-indigo-800';
      case '性能改进':
        return 'bg-orange-100 text-orange-800';
      case '新功能':
        return 'bg-pink-100 text-pink-800';
      case '其他':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 处理HTML内容显示
  const getDescriptionPreview = (description: string) => {
    // 如果是HTML内容，提取纯文本
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = description;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    
    // 限制预览长度
    return text.length > 200 ? text.substring(0, 200) + '...' : text;
  };

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* 标题和状态 */}
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-gray-900 flex-1 mr-4">
            {idea.title}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(idea.status)}`}>
            {getStatusText(idea.status)}
          </span>
        </div>

        {/* 分类和标签 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(idea.category)}`}>
            {idea.category}
          </span>
          
          {idea.tags && idea.tags.length > 0 && (
            <>
              <div className="w-px h-4 bg-gray-300" />
              {idea.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700"
                >
                  <Tag size={12} className="mr-1" />
                  {tag}
                </span>
              ))}
            </>
          )}
        </div>

        {/* 描述预览 */}
        <div className="text-gray-600">
          <p>{getDescriptionPreview(idea.description)}</p>
        </div>

        {/* 元信息 */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            {idea.user ? (
              <div className="flex items-center">
                <User size={16} className="mr-1" />
                <span>{idea.user.name}</span>
              </div>
            ) : idea.contactEmail ? (
              <div className="flex items-center">
                <MessageSquare size={16} className="mr-1" />
                <span>匿名用户</span>
              </div>
            ) : null}
            
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>
                {formatDistanceToNow(new Date(idea.createdAt), {
                  addSuffix: true,
                  locale: zhCN,
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}