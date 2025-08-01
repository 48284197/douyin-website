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
import { resetPasswordSchema, type ResetPasswordFormData } from '@/lib/validations';
import { cn } from '@/lib/utils';

export interface ResetPasswordFormProps {
  onSubmit: (data: ResetPasswordFormData) => Promise<void>;
  className?: string;
}

const ResetPasswordForm = React.forwardRef<HTMLFormElement, ResetPasswordFormProps>(
  ({ onSubmit, className }, ref) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ResetPasswordFormData>({
      resolver: zodResolver(resetPasswordSchema),
    });

    const handleFormSubmit = async (data: ResetPasswordFormData) => {
      try {
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        await onSubmit(data);
        setSuccess('如果该邮箱存在，我们已发送重置密码的链接到您的邮箱。');
      } catch (err) {
        setError(err instanceof Error ? err.message : '发送重置链接失败，请重试');
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit(handleFormSubmit)}
        className={cn('space-y-6', className)}
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">重置密码</h1>
          <p className="text-sm text-gray-600">
            输入您的邮箱地址，我们将发送重置密码的链接
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
            <Label htmlFor="email">邮箱地址</Label>
            <Input
              id="email"
              type="email"
              placeholder="请输入您的邮箱地址"
              {...register('email')}
              className={cn(errors.email && 'border-red-500')}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
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
              <span>发送中...</span>
            </div>
          ) : (
            '发送重置链接'
          )}
        </Button>

        <div className="text-center text-sm">
          <Link
            href="/auth/signin"
            className="text-blue-600 hover:text-blue-500"
          >
            返回登录
          </Link>
        </div>
      </form>
    );
  }
);
ResetPasswordForm.displayName = 'ResetPasswordForm';

export { ResetPasswordForm };