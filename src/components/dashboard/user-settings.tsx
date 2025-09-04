'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Lock } from 'lucide-react';

export function UserSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    activityUpdates: true,
    newFeatures: true,
    marketingEmails: false,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleNotificationChange = (key: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveNotifications = () => {
    setIsLoading(true);
    
    // 模拟API调用
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "通知设置已更新",
        description: "您的通知偏好设置已成功保存。",
      });
    }, 1000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 验证密码
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setIsLoading(false);
      toast({
        title: "密码不匹配",
        description: "新密码和确认密码不匹配，请重新输入。",
        variant: "destructive",
      });
      return;
    }
    
    // 模拟API调用
    setTimeout(() => {
      setIsLoading(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      toast({
        title: "密码已更新",
        description: "您的密码已成功更改。",
      });
    }, 1000);
  };

  return (
    <Tabs defaultValue="notifications">
      <TabsList className="mb-4 w-full flex flex-wrap sm:flex-nowrap">
        <TabsTrigger value="notifications" className="flex-1">通知设置</TabsTrigger>
        <TabsTrigger value="security" className="flex-1">安全设置</TabsTrigger>
        <TabsTrigger value="privacy" className="flex-1">隐私设置</TabsTrigger>
      </TabsList>
      
      <TabsContent value="notifications" className="mt-0">
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle>通知设置</CardTitle>
            <CardDescription>管理您接收通知的方式和频率</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications" className="font-medium">电子邮件通知</Label>
                  <p className="text-sm text-gray-500">接收重要更新和通知到您的邮箱</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={() => handleNotificationChange('emailNotifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pushNotifications" className="font-medium">推送通知</Label>
                  <p className="text-sm text-gray-500">在您的设备上接收实时通知</p>
                </div>
                <Switch
                  id="pushNotifications"
                  checked={notificationSettings.pushNotifications}
                  onCheckedChange={() => handleNotificationChange('pushNotifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="activityUpdates" className="font-medium">活动更新</Label>
                  <p className="text-sm text-gray-500">关于您提交的想法和互动的通知</p>
                </div>
                <Switch
                  id="activityUpdates"
                  checked={notificationSettings.activityUpdates}
                  onCheckedChange={() => handleNotificationChange('activityUpdates')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newFeatures" className="font-medium">新功能通知</Label>
                  <p className="text-sm text-gray-500">关于新功能和产品更新的通知</p>
                </div>
                <Switch
                  id="newFeatures"
                  checked={notificationSettings.newFeatures}
                  onCheckedChange={() => handleNotificationChange('newFeatures')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketingEmails" className="font-medium">营销邮件</Label>
                  <p className="text-sm text-gray-500">接收促销和营销相关的邮件</p>
                </div>
                <Switch
                  id="marketingEmails"
                  checked={notificationSettings.marketingEmails}
                  onCheckedChange={() => handleNotificationChange('marketingEmails')}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveNotifications} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  保存中...
                </>
              ) : (
                '保存设置'
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="security" className="mt-0">
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle>安全设置</CardTitle>
            <CardDescription>管理您的密码和账户安全选项</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">当前密码</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">新密码</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">密码必须至少包含8个字符，包括字母和数字</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">确认新密码</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <Button type="submit" className="mt-2" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    更新中...
                  </>
                ) : (
                  '更改密码'
                )}
              </Button>
            </form>
            
            <div className="border-t pt-4">
              <h3 className="mb-2 font-medium">登录历史</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between rounded-md bg-gray-50 p-2">
                  <span>上海, 中国</span>
                  <span className="text-gray-500">今天, 10:30</span>
                </div>
                <div className="flex justify-between rounded-md bg-gray-50 p-2">
                  <span>北京, 中国</span>
                  <span className="text-gray-500">昨天, 18:45</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="privacy" className="mt-0">
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle>隐私设置</CardTitle>
            <CardDescription>管理您的隐私和数据共享偏好</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="profileVisibility" className="font-medium">个人资料可见性</Label>
                  <p className="text-sm text-gray-500">控制谁可以查看您的个人资料</p>
                </div>
                <Switch id="profileVisibility" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dataCollection" className="font-medium">数据收集</Label>
                  <p className="text-sm text-gray-500">允许收集使用数据以改进服务</p>
                </div>
                <Switch id="dataCollection" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="thirdPartySharing" className="font-medium">第三方数据共享</Label>
                  <p className="text-sm text-gray-500">允许与合作伙伴共享数据</p>
                </div>
                <Switch id="thirdPartySharing" />
              </div>
            </div>
            
            <div className="rounded-md bg-blue-50 p-4 text-blue-800">
              <h4 className="mb-1 font-medium">数据和隐私</h4>
              <p className="text-sm">您可以随时请求导出您的数据或删除您的账户。请联系我们的支持团队了解更多信息。</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="text-red-600 hover:bg-red-50 hover:text-red-700">
              请求删除账户
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}