// 用户相关类型
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
  isEmailVerified: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// 用户会话类型
export interface UserSession {
  user: User;
  expires: string;
}

// 想法提交相关类型
export interface Idea {
  id: string;
  title: string;
  description: string;
  category: IdeaCategory;
  status: IdeaStatus;
  tags?: string[];
  userId?: string;
  user?: User;
  contactEmail?: string;
  adminComment?: string;
  reviewedAt?: Date;
  reviewedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IdeaCategory = '功能建议' | '界面优化' | '性能改进' | '新功能' | '其他';
export type IdeaStatus = 'pending' | 'approved' | 'rejected' | 'implemented';

// 下载相关类型
export interface Download {
  id: string;
  platform: Platform;
  version: string;
  userAgent?: string;
  ipAddress?: string;
  userId?: string;
  user?: User;
  createdAt: Date;
}

export interface SoftwareVersion {
  id: string;
  version: string;
  platform: Platform;
  downloadUrl: string;
  fileSize: number;
  checksum: string;
  releaseNotes?: string;
  isActive: boolean;
  downloadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export type Platform = 'windows' | 'mac-intel' | 'mac-m1';

// 下载统计类型
export interface DownloadStats {
  totalDownloads: number;
  platformBreakdown: Record<Platform, number>;
  versionBreakdown: Record<string, number>;
  dailyDownloads: Array<{
    date: string;
    count: number;
  }>;
}

// API响应类型
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: ErrorCode;
  message: string;
  details?: Record<string, unknown>;
}

export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  DATABASE_ERROR = 'DATABASE_ERROR',
  FILE_UPLOAD_ERROR = 'FILE_UPLOAD_ERROR',
}

// 表单数据类型 - 这些现在从 Zod schemas 推断
import type {
  RegisterFormData as ZodRegisterFormData,
  LoginFormData as ZodLoginFormData,
  IdeaFormData as ZodIdeaFormData,
  ResetPasswordFormData,
  ChangePasswordFormData,
  UpdateProfileFormData,
  DownloadTrackData,
  SoftwareVersionData,
  IdeaReviewData,
  SearchIdeasData,
  PaginationData,
  EmailData,
} from '../lib/validations';

// 重新导出 Zod 推断的类型
export type RegisterFormData = ZodRegisterFormData;
export type LoginFormData = ZodLoginFormData;
export type IdeaFormData = ZodIdeaFormData & { tags: string[] };
export type {
  ResetPasswordFormData,
  ChangePasswordFormData,
  UpdateProfileFormData,
  DownloadTrackData,
  SoftwareVersionData,
  IdeaReviewData,
  SearchIdeasData,
  PaginationData,
  EmailData,
};

// 分页类型
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

// 邮件类型
export interface EmailTemplate {
  type: EmailType;
  subject: string;
  htmlContent: string;
  textContent: string;
}

export type EmailType = 'welcome' | 'password-reset' | 'idea-confirmation' | 'admin-notification';

// 文件上传类型
export interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

// 软件功能展示类型
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  order: number;
}

export interface Screenshot {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  order: number;
}

// 系统配置类型
export interface SystemConfig {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  maxFileSize: number;
  allowedFileTypes: string[];
  rateLimits: {
    downloads: number;
    ideas: number;
    auth: number;
  };
}

// 用户活动日志类型
export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}
// NextAuth types extension
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    image?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}

// Password reset token types
export interface PasswordResetToken {
  id: number;
  token: string;
  userId: number;
  expiresAt: Date;
  used: boolean;
  createdAt: Date;
  user?: User;
}