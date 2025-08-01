'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { IDEA_CATEGORIES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import { Alert } from '@/components/ui/alert';
import { IdeaCard } from './idea-card';
import type { Idea, PaginatedResponse } from '@/types';

export function IdeasList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  // 搜索和筛选状态
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || '');

  const fetchIdeas = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
      });

      if (searchQuery) params.append('query', searchQuery);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedStatus) params.append('status', selectedStatus);

      const response = await fetch(`/api/ideas?${params}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || '获取想法列表失败');
      }

      const data = result.data as PaginatedResponse<Idea>;
      setIdeas(data.data);
      setPagination(data.pagination);
    } catch (error) {
      setError(error instanceof Error ? error.message : '获取想法列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas(1);
  }, [searchQuery, selectedCategory, selectedStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('query', searchQuery);
    if (selectedCategory) params.append('category', selectedCategory);
    if (selectedStatus) params.append('status', selectedStatus);
    
    router.push(`/ideas/list?${params}`);
    fetchIdeas(1);
  };

  const handlePageChange = (newPage: number) => {
    fetchIdeas(newPage);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedStatus('');
    router.push('/ideas/list');
  };

  return (
    <div className="space-y-6">
      {/* 搜索和筛选 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Input
              type="text"
              placeholder="搜索想法..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">所有分类</option>
              {IDEA_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">所有状态</option>
              <option value="pending">待审核</option>
              <option value="approved">已通过</option>
              <option value="rejected">已拒绝</option>
              <option value="implemented">已实现</option>
            </select>
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={handleSearch} className="flex-1">
              搜索
            </Button>
            <Button variant="outline" onClick={clearFilters}>
              清除
            </Button>
          </div>
        </div>
      </div>

      {/* 想法列表 */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loading />
        </div>
      ) : error ? (
        <Alert variant="destructive">
          {error}
        </Alert>
      ) : ideas.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">暂无想法</p>
          <Button
            onClick={() => router.push('/ideas')}
            className="mt-4"
          >
            提交第一个想法
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      )}

      {/* 分页 */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 py-6">
          <Button
            variant="outline"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={!pagination.hasPrev}
          >
            上一页
          </Button>
          
          <span className="text-sm text-gray-600">
            第 {pagination.page} 页，共 {pagination.totalPages} 页
          </span>
          
          <Button
            variant="outline"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={!pagination.hasNext}
          >
            下一页
          </Button>
        </div>
      )}
    </div>
  );
}