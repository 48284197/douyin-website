"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">数据分析</h1>
        <div className="flex items-center gap-2">
          <select className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-gray-300 focus:outline-none focus:ring-0">
            <option value="7days">最近7天</option>
            <option value="30days">最近30天</option>
            <option value="90days">最近90天</option>
            <option value="year">今年</option>
            <option value="all">全部时间</option>
          </select>
          <button className="inline-flex items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200">
            导出报告
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm hover:shadow transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">总用户数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,685</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
              12.5% 较上月
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">活跃用户</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,924</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
              8.2% 较上月
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">内容总数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,453</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
              15.3% 较上月
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">总浏览量</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245,362</div>
            <p className="text-xs text-red-600 flex items-center mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                <polyline points="16 17 22 17 22 11" />
              </svg>
              3.2% 较上月
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm hover:shadow transition-all">
          <CardHeader>
            <CardTitle>用户增长趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">图表将在这里显示</p>
                <p className="text-xs text-gray-400">（实际项目中集成图表库）</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow transition-all">
          <CardHeader>
            <CardTitle>内容浏览分布</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                  <path d="M22 12A10 10 0 0 0 12 2v10z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">图表将在这里显示</p>
                <p className="text-xs text-gray-400">（实际项目中集成图表库）</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm hover:shadow transition-all">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>热门内容</CardTitle>
            <button className="text-sm text-blue-600 hover:underline">
              查看全部
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left text-sm font-medium text-gray-500">标题</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">作者</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">分类</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">浏览量</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">点赞数</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">评论数</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 text-sm font-medium">如何提高视频播放量</td>
                  <td className="py-3 text-sm">李四</td>
                  <td className="py-3 text-sm">营销</td>
                  <td className="py-3 text-sm">12,435</td>
                  <td className="py-3 text-sm">1,245</td>
                  <td className="py-3 text-sm">324</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 text-sm font-medium">平台规则更新公告</td>
                  <td className="py-3 text-sm">管理员</td>
                  <td className="py-3 text-sm">公告</td>
                  <td className="py-3 text-sm">8,562</td>
                  <td className="py-3 text-sm">952</td>
                  <td className="py-3 text-sm">156</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 text-sm font-medium">抖音平台使用指南</td>
                  <td className="py-3 text-sm">张三</td>
                  <td className="py-3 text-sm">教程</td>
                  <td className="py-3 text-sm">7,845</td>
                  <td className="py-3 text-sm">845</td>
                  <td className="py-3 text-sm">132</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 text-sm font-medium">短视频拍摄技巧大全</td>
                  <td className="py-3 text-sm">王五</td>
                  <td className="py-3 text-sm">教程</td>
                  <td className="py-3 text-sm">6,542</td>
                  <td className="py-3 text-sm">754</td>
                  <td className="py-3 text-sm">98</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 text-sm font-medium">如何增加粉丝互动</td>
                  <td className="py-3 text-sm">赵六</td>
                  <td className="py-3 text-sm">营销</td>
                  <td className="py-3 text-sm">5,321</td>
                  <td className="py-3 text-sm">632</td>
                  <td className="py-3 text-sm">87</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}