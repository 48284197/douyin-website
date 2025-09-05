"use client"

import {
  LogOutIcon,
  MonitorIcon,
  MoonIcon,
  MoreVerticalIcon,
  SunIcon,
} from "lucide-react"
import { useTheme } from "@/components/providers/theme-provider"
import { signOut } from "next-auth/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const { theme, setTheme } = useTheme()
  
  const handleLogout = async () => {
    try {
      // 调用后端API
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      // 使用NextAuth的signOut函数
      await signOut({
        callbackUrl: '/auth/signin',
        redirect: true
      })
    } catch (error) {
      console.error('退出登录失败:', error)
      // 即使API调用失败，也尝试清除前端会话
      await signOut({
        callbackUrl: '/auth/signin',
        redirect: true
      })
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem 
                onClick={() => setTheme("light")}
                className={`cursor-pointer transition-colors ${
                  theme === "light" 
                    ? "bg-accent text-accent-foreground font-medium" 
                    : "hover:bg-accent/50"
                }`}
              >
                <SunIcon className="h-4 w-4" />
                浅色主题
                {theme === "light" && (
                  <span className="ml-auto text-primary font-bold">✓</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme("dark")}
                className={`cursor-pointer transition-colors ${
                  theme === "dark" 
                    ? "bg-accent text-accent-foreground font-medium" 
                    : "hover:bg-accent/50"
                }`}
              >
                <MoonIcon className="h-4 w-4" />
                暗色主题
                {theme === "dark" && (
                  <span className="ml-auto text-primary font-bold">✓</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme("system")}
                className={`cursor-pointer transition-colors ${
                  theme === "system" 
                    ? "bg-accent text-accent-foreground font-medium" 
                    : "hover:bg-accent/50"
                }`}
              >
                <MonitorIcon className="h-4 w-4" />
                跟随系统
                {theme === "system" && (
                  <span className="ml-auto text-primary font-bold">✓</span>
                )}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon />
              退出登录
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
