"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Content = {
  id: string;
  title: string;
  author: string;
  category: string;
  status: "published" | "draft" | "archived";
  views: number;
  publishedAt: string;
};

export default function ContentPage() {
  const [contents, setContents] = useState<Content[]>([
    {
      id: "1",
      title: "抖音平台使用指南",
      author: "张三",
      category: "教程",
      status: "published",
      views: 1250,
      publishedAt: "2023-01-15",
    },
    {
      id: "2",
      title: "如何提高视频播放量",
      author: "李四",
      category: "营销",
      status: "published",
      views: 3420,
      publishedAt: "2023-02-20",
    },
    {
      id: "3",
      title: "内容创作者最佳实践",
      author: "王五",
      category: "创作",
      status: "draft",
      views: 0,
      publishedAt: "",
    },
    {
      id: "4",
      title: "平台规则更新公告",
      author: "管理员",
      category: "公告",
      status: "published",
      views: 5680,
      publishedAt: "2023-04-05",
    },
    {
      id: "5",
      title: "旧版功能说明文档",
      author: "管理员",
      category: "文档",
      status: "archived",
      views: 120,
      publishedAt: "2022-11-12",
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <span className="inline-flex items-center rounded-full border border-green-500 bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
            已发布
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center rounded-full border border-yellow-500 bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-600">
            草稿
          </span>
        );
      case "archived":
        return (
          <span className="inline-flex items-center rounded-full border border-gray-500 bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-600">
            已归档
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">内容管理</h1>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
            创建内容
          </button>
        </div>
      </div>

      <Card className="shadow-sm hover:shadow transition-all">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>内容列表</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="search"
                  placeholder="搜索内容..."
                  className="rounded-md border border-gray-200 pl-9 pr-4 py-2 text-sm focus:border-gray-300 focus:outline-none focus:ring-0"
                />
              </div>
              <select className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-gray-300 focus:outline-none focus:ring-0">
                <option value="all">所有分类</option>
                <option value="tutorial">教程</option>
                <option value="marketing">营销</option>
                <option value="creation">创作</option>
                <option value="announcement">公告</option>
                <option value="documentation">文档</option>
              </select>
              <select className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-gray-300 focus:outline-none focus:ring-0">
                <option value="all">所有状态</option>
                <option value="published">已发布</option>
                <option value="draft">草稿</option>
                <option value="archived">已归档</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left text-sm font-medium text-gray-500">ID</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">标题</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">作者</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">分类</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">状态</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">浏览量</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">发布日期</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody>
                {contents.map((content) => (
                  <tr key={content.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 text-sm">{content.id}</td>
                    <td className="py-3 text-sm font-medium">{content.title}</td>
                    <td className="py-3 text-sm">{content.author}</td>
                    <td className="py-3 text-sm">{content.category}</td>
                    <td className="py-3 text-sm">{getStatusBadge(content.status)}</td>
                    <td className="py-3 text-sm">{content.views.toLocaleString()}</td>
                    <td className="py-3 text-sm">{content.publishedAt || "-"}</td>
                    <td className="py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <button className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium hover:bg-gray-200">
                          编辑
                        </button>
                        <button className="rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-200">
                          预览
                        </button>
                        <button className="rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-200">
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              显示 <span className="font-medium">1</span> 到{" "}
              <span className="font-medium">5</span> 条，共{" "}
              <span className="font-medium">5</span> 条
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled
                className="inline-flex items-center justify-center rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-400 disabled:opacity-50"
              >
                上一页
              </button>
              <button
                disabled
                className="inline-flex items-center justify-center rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-400 disabled:opacity-50"
              >
                下一页
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}