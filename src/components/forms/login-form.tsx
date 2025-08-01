'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertIcon } from '@/components/ui/alert';
import { Loading } from '@/components/ui/loading';
import { loginSchema, type LoginFormData } from '@/lib/validations';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  className?: string;
  redirectTo?: string;
}

const LoginForm = React.forwardRef<HTMLFormElement, LoginFormProps>(
  ({ onSubmit, className, redirectTo }, ref) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
    });

    const handleFormSubmit = async (data: LoginFormData) => {
      try {
        setIsLoading(true);
        setError(null);
        await onSubmit(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '登录失败，请重试');
      } finally {
        setIsLoading(false);
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit(handleFormSubmit)}
        className={cn('space-y-6', className)}
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">登录账户</h1>
          <p className="text-sm text-gray-600">
            输入您的邮箱和密码来登录账户
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertIcon variant="destructive" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">邮箱地址</Label>
            <Input
              id="email"
              type="email"
              placeholder="请输入邮箱地址"
              {...register('email')}
              className={cn(errors.email && 'border-red-500')}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">密码</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="请输入密码"
                {...register('password')}
                className={cn(errors.password && 'border-red-500', 'pr-10')}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? '隐藏密码' : '显示密码'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            忘记密码？
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Loading size="sm" />
              <span>登录中...</span>
            </div>
          ) : (
            '登录'
          )}
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-600">还没有账户？</span>{' '}
          <Link
            href="/auth/signup"
            className="text-blue-600 hover:text-blue-500"
          >
            立即注册
          </Link>
        </div>
      </form>
    );
  }
);
LoginForm.displayName = 'LoginForm';

export { LoginForm };