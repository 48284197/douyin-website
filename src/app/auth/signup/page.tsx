'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RegisterForm } from '@/components/forms/register-form';
import { type RegisterFormData } from '@/lib/validations';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();

  const handleRegister = async (data: RegisterFormData) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '注册失败');
    }

    // 注册成功后跳转到登录页面
    router.push('/auth/signin?message=注册成功，请登录');
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
          <RegisterForm onSubmit={handleRegister} />
        </div>
      </div>
    </div>
  );
}