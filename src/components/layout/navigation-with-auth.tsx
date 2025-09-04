'use client';

import { useSession } from 'next-auth/react';
import { Navigation } from './navigation';
import { User } from '@/types';

export function NavigationWithAuth() {
  const { data: session } = useSession();
  
  // 将NextAuth的用户信息转换为应用所需的User类型
  const user = session?.user ? {
    id: session.user.id || '',
    email: session.user.email || '',
    name: session.user.name || '',
    avatarUrl: session.user.image,
    role: 'user',
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  } as User : null;
  
  return <Navigation user={user} />;
}