"use client"

import * as React from "react"
import { useSession } from "next-auth/react"
import {
  BarChart3Icon,
  CogIcon,
  FileTextIcon,
  HeartIcon,
  HomeIcon,
  MessageSquareIcon,
  PlayIcon,
  SearchIcon,
  SettingsIcon,
  TrendingUpIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navData = {
  navMain: [
    {
      title: "用户管理",
      url: "/admin/users",
      icon: UsersIcon,
    },
  ],
  navSecondary: [],
  quickActions: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession()
  
  // 默认用户数据，当session不可用时使用
  const defaultUser = {
    name: "用户",
    email: "user@example.com",
    avatar: "/avatars/default.jpg",
  }
  
  // 使用session中的用户数据，如果没有则使用默认数据
  const user = session?.user ? {
    name: session.user.name || "用户",
    email: session.user.email || "user@example.com",
    avatar: session.user.image || "/avatars/default.jpg",
  } : defaultUser

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/admin">
                <ZapIcon className="h-5 w-5" />
                <span className="text-base font-semibold">抖音后台</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData.navMain} />
        <NavSecondary items={navData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
