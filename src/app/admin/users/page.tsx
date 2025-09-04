"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "banned";
  createdAt: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "张三",
      email: "zhangsan@example.com",
      role: "用户",
      status: "active",
      createdAt: "2023-01-15",
    },
    {
      id: "2",
      name: "李四",
      email: "lisi@example.com",
      role: "用户",
      status: "active",
      createdAt: "2023-02-20",
    },
    {
      id: "3",
      name: "王五",
      email: "wangwu@example.com",
      role: "管理员",
      status: "active",
      createdAt: "2023-03-10",
    },
    {
      id: "4",
      name: "赵六",
      email: "zhaoliu@example.com",
      role: "用户",
      status: "inactive",
      createdAt: "2023-04-05",
    },
    {
      id: "5",
      name: "钱七",
      email: "qianqi@example.com",
      role: "用户",
      status: "banned",
      createdAt: "2023-05-12",
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center rounded-full border border-green-500 bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
            活跃
          </span>
        );
      case "inactive":
        return (
          <span className="inline-flex items-center rounded-full border border-gray-500 bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-600">
            未活跃
          </span>
        );
      case "banned":
        return (
          <span className="inline-flex items-center rounded-full border border-red-500 bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
            已封禁
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">用户管理</h1>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
            添加用户
          </button>
        </div>
      </div>

      <Card className="shadow-sm hover:shadow transition-all">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>用户列表</CardTitle>
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
                  placeholder="搜索用户..."
                  className="rounded-md border border-gray-200 pl-9 pr-4 py-2 text-sm focus:border-gray-300 focus:outline-none focus:ring-0"
                />
              </div>
              <select className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-gray-300 focus:outline-none focus:ring-0">
                <option value="all">所有状态</option>
                <option value="active">活跃</option>
                <option value="inactive">未活跃</option>
                <option value="banned">已封禁</option>
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
                  <th className="py-3 text-left text-sm font-medium text-gray-500">用户名</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">邮箱</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">角色</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">状态</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">注册日期</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 text-sm">{user.id}</td>
                    <td className="py-3 text-sm font-medium">{user.name}</td>
                    <td className="py-3 text-sm">{user.email}</td>
                    <td className="py-3 text-sm">{user.role}</td>
                    <td className="py-3 text-sm">{getStatusBadge(user.status)}</td>
                    <td className="py-3 text-sm">{user.createdAt}</td>
                    <td className="py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <button className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium hover:bg-gray-200">
                          编辑
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