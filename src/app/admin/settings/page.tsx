"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "抖音网页版",
    siteDescription: "抖音短视频分享平台",
    contactEmail: "contact@example.com",
    allowRegistration: true,
    maintenanceMode: false,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordExpiry: 90,
    loginAttempts: 5,
    sessionTimeout: 30,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    systemAnnouncements: true,
    userActivityAlerts: false,
    contentReports: true,
  });

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings({
      ...securitySettings,
      [name]: type === "checkbox" ? checked : parseInt(value),
    });
  };

  const handleSwitchChange = (name: string, checked: boolean, settingsType: string) => {
    if (settingsType === "general") {
      setGeneralSettings({
        ...generalSettings,
        [name]: checked,
      });
    } else if (settingsType === "notification") {
      setNotificationSettings({
        ...notificationSettings,
        [name]: checked,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">系统设置</h1>
        <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
          保存更改
        </button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="general">基本设置</TabsTrigger>
          <TabsTrigger value="security">安全设置</TabsTrigger>
          <TabsTrigger value="notifications">通知设置</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card className="shadow-sm hover:shadow transition-all">
            <CardHeader>
              <CardTitle>基本设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="siteName"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    网站名称
                  </label>
                  <input
                    id="siteName"
                    name="siteName"
                    type="text"
                    value={generalSettings.siteName}
                    onChange={handleGeneralChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contactEmail"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    联系邮箱
                  </label>
                  <input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={handleGeneralChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="siteDescription"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  网站描述
                </label>
                <textarea
                  id="siteDescription"
                  name="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={handleGeneralChange as any}
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label
                      htmlFor="allowRegistration"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      允许用户注册
                    </label>
                    <p className="text-xs text-gray-500">
                      开启后，新用户可以自行注册账号
                    </p>
                  </div>
                  <Switch
                    id="allowRegistration"
                    checked={generalSettings.allowRegistration}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("allowRegistration", checked, "general")
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label
                      htmlFor="maintenanceMode"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      维护模式
                    </label>
                    <p className="text-xs text-gray-500">
                      开启后，普通用户将无法访问网站
                    </p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={generalSettings.maintenanceMode}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("maintenanceMode", checked, "general")
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card className="shadow-sm hover:shadow transition-all">
            <CardHeader>
              <CardTitle>安全设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label
                    htmlFor="twoFactorAuth"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    两步验证
                  </label>
                  <p className="text-xs text-gray-500">
                    要求管理员账户使用两步验证登录
                  </p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) =>
                    setSecuritySettings({
                      ...securitySettings,
                      twoFactorAuth: checked,
                    })
                  }
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="passwordExpiry"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    密码过期时间（天）
                  </label>
                  <input
                    id="passwordExpiry"
                    name="passwordExpiry"
                    type="number"
                    value={securitySettings.passwordExpiry}
                    onChange={handleSecurityChange}
                    min="0"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="loginAttempts"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    最大登录尝试次数
                  </label>
                  <input
                    id="loginAttempts"
                    name="loginAttempts"
                    type="number"
                    value={securitySettings.loginAttempts}
                    onChange={handleSecurityChange}
                    min="1"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="sessionTimeout"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  会话超时时间（分钟）
                </label>
                <input
                  id="sessionTimeout"
                  name="sessionTimeout"
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={handleSecurityChange}
                  min="5"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card className="shadow-sm hover:shadow transition-all">
            <CardHeader>
              <CardTitle>通知设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label
                      htmlFor="emailNotifications"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      电子邮件通知
                    </label>
                    <p className="text-xs text-gray-500">
                      接收系统重要更新的电子邮件通知
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      handleSwitchChange(
                        "emailNotifications",
                        checked,
                        "notification"
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label
                      htmlFor="systemAnnouncements"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      系统公告
                    </label>
                    <p className="text-xs text-gray-500">
                      接收系统公告和更新信息
                    </p>
                  </div>
                  <Switch
                    id="systemAnnouncements"
                    checked={notificationSettings.systemAnnouncements}
                    onCheckedChange={(checked) =>
                      handleSwitchChange(
                        "systemAnnouncements",
                        checked,
                        "notification"
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label
                      htmlFor="userActivityAlerts"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      用户活动提醒
                    </label>
                    <p className="text-xs text-gray-500">
                      接收用户注册、登录等活动的提醒
                    </p>
                  </div>
                  <Switch
                    id="userActivityAlerts"
                    checked={notificationSettings.userActivityAlerts}
                    onCheckedChange={(checked) =>
                      handleSwitchChange(
                        "userActivityAlerts",
                        checked,
                        "notification"
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label
                      htmlFor="contentReports"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      内容举报通知
                    </label>
                    <p className="text-xs text-gray-500">
                      接收用户举报内容的通知
                    </p>
                  </div>
                  <Switch
                    id="contentReports"
                    checked={notificationSettings.contentReports}
                    onCheckedChange={(checked) =>
                      handleSwitchChange(
                        "contentReports",
                        checked,
                        "notification"
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}