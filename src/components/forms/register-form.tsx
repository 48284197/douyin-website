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
import { registerSchema, type RegisterFormData } from '@/lib/validations';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Check, X } from 'lucide-react';

export interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  className?: string;
}

const RegisterForm = React.forwardRef<HTMLFormElement, RegisterFormProps>(
  ({ onSubmit, className }, ref) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<RegisterFormData>({
      resolver: zodResolver(registerSchema),
    });

    const password = watch('password');

    const handleFormSubmit = async (data: RegisterFormData) => {
      try {
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        await onSubmit(data);
        setSuccess('注册成功！请查收邮箱验证邮件。');
      } catch (err) {
        setError(err instanceof Error ? err.message : '注册失败，请重试');
      } finally {
        setIsLoading(false);
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // Password strength indicators
    const passwordRequirements = [
      { test: (pwd: string) => pwd.length >= 8, label: '至少8个字符' },
      { test: (pwd: string) => /[a-z]/.test(pwd), label: '包含小写字母' },
      { test: (pwd: string) => /[A-Z]/.test(pwd), label: '包含大写字母' },
      { test: (pwd: string) => /\d/.test(pwd), label: '包含数字' },
    ];

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit(handleFormSubmit)}
        className={cn('space-y-6', className)}
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">创建账户</h1>
          <p className="text-sm text-gray-600">
            填写以下信息来创建您的账户
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertIcon variant="destructive" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert variant="success">
            <AlertIcon variant="success" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">姓名</Label>
            <Input
              id="name"
              type="text"
              placeholder="请输入您的姓名"
              {...register('name')}
              className={cn(errors.name && 'border-red-500')}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

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
            
            {/* Password requirements */}
            {password && (
              <div className="space-y-1">
                {passwordRequirements.map((req, index) => {
                  const isValid = req.test(password);
                  return (
                    <div
                      key={index}
                      className={cn(
                        'flex items-center space-x-2 text-xs',
                        isValid ? 'text-green-600' : 'text-gray-500'
                      )}
                    >
                      {isValid ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                      <span>{req.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
            
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Loading size="sm" />
              <span>注册中...</span>
            </div>
          ) : (
            '创建账户'
          )}
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-600">已有账户？</span>{' '}
          <Link
            href="/auth/signin"
            className="text-blue-600 hover:text-blue-500"
          >
            立即登录
          </Link>
        </div>

        <div className="text-xs text-gray-500">
          <p>
            点击&ldquo;创建账户&rdquo;即表示您同意我们的{' '}
            <Link href="/terms" className="text-blue-600 hover:text-blue-500">
              服务条款
            </Link>{' '}
            和{' '}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
              隐私政策
            </Link>
            。
          </p>
        </div>
      </form>
    );
  }
);
RegisterForm.displayName = 'RegisterForm';

export { RegisterForm };