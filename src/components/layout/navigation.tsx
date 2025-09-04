'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut, Search, Bell } from 'lucide-react';
import type { User as UserType } from '@/types';

export interface NavigationProps {
  user?: UserType | null;
  className?: string;
}

const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  ({ user, className }, ref) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
    const userMenuRef = React.useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    
    // 处理点击事件，关闭用户菜单
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
          setIsUserMenuOpen(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const navItems = [
      { href: '/', label: '首页' },
      { href: '/download', label: '下载' },
      { href: '/ideas', label: '想法提交' },
    ];

    const isActive = (href: string) => {
      if (href === '/') {
        return pathname === '/';
      }
      return pathname.startsWith(href);
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleSignOut = async () => {
      await signOut({ redirect: false });
    };

    return (
      <nav
        ref={ref}
        className={cn(
          'sticky top-0 z-50 w-full border-b border-gray-200 bg-black text-white backdrop-blur supports-[backdrop-filter]:bg-black/90',
          className
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-xs">抖</span>
              </div>
              <span className="text-xl font-bold text-white">
                抖音直播互动
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-pink-500 relative group',
                    isActive(item.href)
                      ? 'text-pink-500'
                      : 'text-gray-200'
                  )}
                >
                  {item.label}
                  <span className={cn(
                    'absolute -bottom-1 left-0 h-0.5 bg-pink-500 transition-all duration-300',
                    isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  )}></span>
                </Link>
              ))}
            </div>

            {/* Desktop User Menu */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              <button className="text-gray-200 hover:text-white transition-colors">
                <Search className="h-5 w-5" />
              </button>
              
              {user ? (
                <div className="flex items-center space-x-6">
                  <button className="text-gray-200 hover:text-white transition-colors">
                    <Bell className="h-5 w-5" />
                  </button>
                  <div className="relative" ref={userMenuRef}>
                    <div 
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    >
                      <div className="h-8 w-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-medium">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-white">{user.name}</span>
                    </div>
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          个人中心
                        </Link>
                        <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          退出登录
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/auth/signin">
                    <Button variant="ghost" size="sm" className="text-white hover:text-pink-500 hover:bg-transparent">
                      登录
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm" className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white border-0">
                      注册
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-gray-800"
              onClick={toggleMenu}
              aria-label="切换菜单"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="border-t border-gray-700 pb-4 pt-4 md:hidden">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'block px-3 py-2 text-base font-medium transition-colors hover:bg-gray-800 hover:text-pink-500',
                      isActive(item.href)
                        ? 'text-pink-500 bg-gray-800'
                        : 'text-gray-300'
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile User Menu */}
              <div className="mt-4 border-t border-gray-700 pt-4">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-medium">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-base font-medium text-white">{user.name}</span>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-pink-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span>个人中心</span>
                    </Link>
                    <button 
                      className="flex w-full items-center space-x-2 px-3 py-2 text-left text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-pink-500"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-5 w-5" />
                      <span>退出登录</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 px-3">
                    <Link
                      href="/auth/signin"
                      className="block py-2 text-base font-medium text-gray-300 hover:text-pink-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      登录
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block py-2 px-4 text-base font-medium text-white bg-gradient-to-r from-pink-500 to-blue-500 rounded-full text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      立即注册
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }
);
Navigation.displayName = 'Navigation';

export { Navigation };