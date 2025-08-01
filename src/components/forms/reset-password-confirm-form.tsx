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
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { USER_CONSTRAINTS, REGEX_PATTERNS } from '@/lib/constants';

const resetPasswordConfirmSchema = z.object({
  password: z
    .string()
    .min(USER_CONSTRAINTS.PASSWORD_MIN_LENGTH, `密码至少需要${USER_CONSTRAINTS.PASSWORD_MIN_LENGTH}个字符`)
    .regex(REGEX_PATTERNS.PASSWORD_STRONG, '密码需要包含大小写字母和数字'),
  confirmPassword: z.string().min(1, '请确认密码'),
}).refine((data) => data.password === data.confirmPassword, {
  message: '两次输入的密码不一致',
  path: ['confirmPassword'],
});

type ResetPasswordConfirmFormData = z.infer<typeof resetPasswordConfirmSchema>;

export interface ResetPasswordConfirmFormProps {
  onSubmit: (data: { password: string; token: string }) => Promise<void>;
  token: string;
  className?: string;
}

const ResetPasswordConfirmForm = React.forwardRef<HTMLFormElement, ResetPasswordConfirmFormProps>(
  ({ onSubmit, token, className }, ref) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<ResetPasswordConfirmFormData>({
      resolver: zodResolver(resetPasswordConfirmSchema),
    });

    const password = watch('password');

    const handleFormSubmit = async (data: ResetPasswordConfirmFormData) => {
      try {
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        await onSubmit({ password: data.password, token });
        setSuccess('密码重置成功！您现在可以使用新密码登录。');
      } catch (err) {
        setError(err instanceof Error ? err.message : '密码重置失败，请重试');
      } finally {
        setIsLoading(false);
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
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
          <h1 className="text-2xl font-bold tracking-tight">设置新密码</h1>
          <p className="text-sm text-gray-600">
            请输入您的新密码
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
            <Label htmlFor="password">新密码</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="请输入新密码"
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">确认新密码</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="请再次输入新密码"
                {...register('confirmPassword')}
                className={cn(errors.confirmPassword && 'border-red-500', 'pr-10')}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={showConfirmPassword ? '隐藏密码' : '显示密码'}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || success !== null}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Loading size="sm" />
              <span>重置中...</span>
            </div>
          ) : success ? (
            '密码已重置'
          ) : (
            '重置密码'
          )}
        </Button>

        {success && (
          <div className="text-center">
            <Link
              href="/auth/signin"
              className="text-blue-600 hover:text-blue-500"
            >
              前往登录
            </Link>
          </div>
        )}
      </form>
    );
  }
);
ResetPasswordConfirmForm.displayName = 'ResetPasswordConfirmForm';

export { ResetPasswordConfirmForm };