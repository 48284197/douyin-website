"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">仪表盘</h1>
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-background px-4 py-2 text-sm text-muted-foreground shadow-sm border border-border flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground/70">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            {new Date().toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
      
      {/* 统计卡片 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border border-border/40 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 shadow-md hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-300">总用户数</CardTitle>
            <div className="rounded-full bg-blue-100/80 p-2 dark:bg-blue-900/30 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-blue-600 dark:text-blue-400"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">12,345</div>
            <p className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-green-500">
                <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">+180</span> 新用户 (本周)
            </p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border border-border/40 bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-950/30 dark:to-pink-950/30 shadow-md hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-300">内容数量</CardTitle>
            <div className="rounded-full bg-purple-100/80 p-2 dark:bg-purple-900/30 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-purple-600 dark:text-purple-400"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">8,721</div>
            <p className="text-xs text-purple-600/80 dark:text-purple-400/80 mt-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-green-500">
                <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">+43</span> 新内容 (今日)
            </p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border border-border/40 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/30 dark:to-teal-950/30 shadow-md hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-emerald-800 dark:text-emerald-300">总浏览量</CardTitle>
            <div className="rounded-full bg-emerald-100/80 p-2 dark:bg-emerald-900/30 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">2.4M</div>
            <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 mt-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-green-500">
                <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">+24%</span> (过去30天)
            </p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border border-border/40 bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-950/30 dark:to-orange-950/30 shadow-md hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-amber-800 dark:text-amber-300">互动量</CardTitle>
            <div className="rounded-full bg-amber-100/80 p-2 dark:bg-amber-900/30 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-amber-600 dark:text-amber-400"
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-700 dark:text-amber-300">573K</div>
            <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-green-500">
                <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">+12%</span> (过去7天)
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* 最近活动和图表 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 shadow-md hover:shadow-lg transition-all duration-200 border border-border/40 bg-white dark:bg-gray-950/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
              流量趋势
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  日
                </button>
                <button className="px-3 py-1 text-xs font-medium rounded-md hover:bg-muted transition-colors">
                  周
                </button>
                <button className="px-3 py-1 text-xs font-medium rounded-md hover:bg-muted transition-colors">
                  月
                </button>
                <button className="px-3 py-1 text-xs font-medium rounded-md hover:bg-muted transition-colors">
                  年
                </button>
              </div>
              <button className="text-xs text-primary hover:underline">
                查看详情
              </button>
            </div>
            <div className="h-[260px] flex items-center justify-center border border-dashed rounded-lg bg-muted/20">
              <div className="text-center space-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 mx-auto text-muted-foreground/50">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
                <p className="text-sm text-muted-foreground">流量趋势图表</p>
                <p className="text-xs text-muted-foreground/70">集成图表库后显示实时数据</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3 shadow-md hover:shadow-lg transition-all duration-200 border border-border/40 bg-white dark:bg-gray-950/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              最近活动
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  user: "张三",
                  action: "发布了新内容",
                  time: "10分钟前",
                  color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                },
                {
                  user: "李四",
                  action: "更新了个人资料",
                  time: "30分钟前",
                  color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                },
                {
                  user: "王五",
                  action: "评论了视频",
                  time: "1小时前",
                  color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                },
                {
                  user: "赵六",
                  action: "上传了新视频",
                  time: "2小时前",
                  color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                },
                {
                  user: "系统",
                  action: "执行了定时任务",
                  time: "3小时前",
                  color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-lg border p-3 hover:bg-muted/20 transition-colors duration-200 group cursor-pointer"
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${activity.color} group-hover:scale-110 transition-transform duration-200`}>
                    {activity.user.charAt(0)}
                  </div>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.user}
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                  <div className="ml-auto text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-xs text-primary hover:underline">
                查看全部活动
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* 快速访问 */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
            <path d="M12 2H2v10h10V2Z" />
            <path d="M22 2h-8v8h8V2Z" />
            <path d="M12 14H2v8h10v-8Z" />
            <path d="M22 14h-8v8h8v-8Z" />
          </svg>
          快速访问
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "用户管理", icon: "users", color: "from-blue-500 to-blue-600", bgColor: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20", href: "/admin/users" },
            { title: "内容管理", icon: "file", color: "from-purple-500 to-purple-600", bgColor: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20", href: "/admin/content" },
            { title: "数据统计", icon: "bar-chart", color: "from-emerald-500 to-emerald-600", bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20", href: "/admin/analytics" },
            { title: "系统设置", icon: "settings", color: "from-amber-500 to-amber-600", bgColor: "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20", href: "/admin/settings" },
          ].map((item, index) => (
            <Card key={index} className="group cursor-pointer overflow-hidden border border-border/40 hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                    {item.icon === "users" && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-6 w-6 text-transparent bg-clip-text bg-gradient-to-br ${item.color}`}>
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    )}
                    {item.icon === "file" && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-6 w-6 text-transparent bg-clip-text bg-gradient-to-br ${item.color}`}>
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    )}
                    {item.icon === "bar-chart" && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-6 w-6 text-transparent bg-clip-text bg-gradient-to-br ${item.color}`}>
                        <path d="M3 3v18h18" />
                        <path d="m19 9-5 5-4-4-3 3" />
                      </svg>
                    )}
                    {item.icon === "settings" && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-6 w-6 text-transparent bg-clip-text bg-gradient-to-br ${item.color}`}>
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">快速访问{item.title}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t flex justify-end">
                  <button className="text-xs flex items-center gap-1 text-primary hover:underline">
                    访问
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}