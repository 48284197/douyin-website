'use client';

import { useState } from 'react';
import { User as UserType } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';
import { Camera, Check, Loader2 } from 'lucide-react';

// 扩展User类型以适应组件需求
interface ExtendedUser {
  id: string;
  email: string;
  name: string;
  image?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string;
  role?: 'user' | 'admin';
  isEmailVerified?: boolean;
  lastLoginAt?: Date;
}

interface UserProfileProps {
  user: ExtendedUser;
}

export function UserProfile({ user }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: '',
    avatarUrl: user.avatarUrl || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 模拟API调用
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      toast({
        title: "个人资料已更新",
        description: "您的个人资料信息已成功更新。",
      });
    }, 1000);
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="border-b pb-6">
        <CardTitle className="text-2xl font-bold text-gray-800">个人资料</CardTitle>
        <CardDescription className="text-gray-600">查看和更新您的个人信息</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* 头像上传区域 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={formData.avatarUrl} alt={formData.name} />
                  <AvatarFallback className="bg-gradient-to-r from-pink-500 to-blue-500 text-white text-xl">
                    {formData.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div className="absolute bottom-0 right-0 rounded-full bg-primary p-1 text-white">
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                      <Camera className="h-4 w-4" />
                      <input 
                        id="avatar-upload" 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                      />
                    </label>
                  </div>
                )}
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium">{formData.name}</h3>
                <p className="text-sm text-gray-500">{formData.email}</p>
              </div>
            </div>

            {/* 用户信息表单 */}
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">用户名</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">电子邮箱</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={true} // 邮箱不允许修改
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="bio">个人简介</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder={isEditing ? "介绍一下自己..." : "暂无个人简介"}
                  className="min-h-[100px]"
                />
              </div>

              {/* 账户信息 */}
              <div className="rounded-md bg-gray-50 p-4">
                <h4 className="mb-2 font-medium">账户信息</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">账户创建时间</p>
                    <p>{new Date(user.createdAt).toLocaleDateString('zh-CN')}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">上次登录时间</p>
                    <p>{user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString('zh-CN') : '未知'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">账户状态</p>
                    <div className="flex items-center">
                      <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
                      <span>活跃</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500">邮箱验证</p>
                    <div className="flex items-center">
                      {user.isEmailVerified ? (
                        <>
                          <Check className="mr-1 h-4 w-4 text-green-500" />
                          <span>已验证</span>
                        </>
                      ) : (
                        <>
                          <span className="mr-1 h-2 w-2 rounded-full bg-yellow-500"></span>
                          <span>未验证</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={() => setIsEditing(false)}>取消</Button>
            <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  保存中...
                </>
              ) : (
                '保存更改'
              )}
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>编辑个人资料</Button>
        )}
      </CardFooter>
    </Card>
  );
}