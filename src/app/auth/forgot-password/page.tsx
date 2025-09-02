'use client';

import { ResetPasswordForm } from '@/components/forms/reset-password-form';
import { type ResetPasswordFormData } from '@/lib/validations';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const handleResetPassword = async (data: ResetPasswordFormData) => {
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '发送重置邮件失败');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            抖音直播互动软件
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8">
          <ResetPasswordForm onSubmit={handleResetPassword} />
        </div>
      </div>
    </div>
  );
}