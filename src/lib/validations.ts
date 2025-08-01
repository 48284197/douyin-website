import { z } from 'zod';
import {
  USER_CONSTRAINTS,
  IDEA_CONSTRAINTS,
  IDEA_CATEGORIES,
  IDEA_STATUSES,
  PLATFORMS,
  PAGINATION_CONSTRAINTS,
  SEARCH_CONSTRAINTS,
  EMAIL_CONSTRAINTS,
  EMAIL_TYPES,
  REGEX_PATTERNS,
} from './constants';

// 用户注册验证
export const registerSchema = z.object({
  email: z.string().min(1, '请输入邮箱地址').email('请输入有效的邮箱地址'),
  password: z
    .string()
    .min(USER_CONSTRAINTS.PASSWORD_MIN_LENGTH, `密码至少需要${USER_CONSTRAINTS.PASSWORD_MIN_LENGTH}个字符`)
    .regex(REGEX_PATTERNS.PASSWORD_STRONG, '密码需要包含大小写字母和数字'),
  name: z
    .string()
    .min(USER_CONSTRAINTS.NAME_MIN_LENGTH, `姓名至少需要${USER_CONSTRAINTS.NAME_MIN_LENGTH}个字符`)
    .max(USER_CONSTRAINTS.NAME_MAX_LENGTH, `姓名不能超过${USER_CONSTRAINTS.NAME_MAX_LENGTH}个字符`),
});

// 用户登录验证
export const loginSchema = z.object({
  email: z.string().min(1, '请输入邮箱地址').email('请输入有效的邮箱地址'),
  password: z.string().min(1, '请输入密码'),
});

// 想法提交验证
export const ideaSchema = z.object({
  title: z
    .string()
    .min(IDEA_CONSTRAINTS.TITLE_MIN_LENGTH, `标题至少需要${IDEA_CONSTRAINTS.TITLE_MIN_LENGTH}个字符`)
    .max(IDEA_CONSTRAINTS.TITLE_MAX_LENGTH, `标题不能超过${IDEA_CONSTRAINTS.TITLE_MAX_LENGTH}个字符`),
  description: z
    .string()
    .min(IDEA_CONSTRAINTS.DESCRIPTION_MIN_LENGTH, `描述至少需要${IDEA_CONSTRAINTS.DESCRIPTION_MIN_LENGTH}个字符`)
    .max(IDEA_CONSTRAINTS.DESCRIPTION_MAX_LENGTH, `描述不能超过${IDEA_CONSTRAINTS.DESCRIPTION_MAX_LENGTH}个字符`),
  category: z.enum(IDEA_CATEGORIES, {
    message: '请选择一个有效的分类',
  }),
  tags: z
    .array(z.string().min(1).max(20))
    .max(10, '最多只能添加10个标签')
    .default([]),
  contactEmail: z
    .string()
    .email('请输入有效的邮箱地址')
    .optional()
    .or(z.literal('')),
});

// 密码重置验证
export const resetPasswordSchema = z.object({
  email: z.string().min(1, '请输入邮箱地址').email('请输入有效的邮箱地址'),
});

// 更改密码验证
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, '请输入当前密码'),
    newPassword: z
      .string()
      .min(USER_CONSTRAINTS.PASSWORD_MIN_LENGTH, `新密码至少需要${USER_CONSTRAINTS.PASSWORD_MIN_LENGTH}个字符`)
      .regex(
        REGEX_PATTERNS.PASSWORD_STRONG,
        '新密码需要包含大小写字母和数字'
      ),
    confirmPassword: z.string().min(1, '请确认新密码'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'],
  });

// 用户资料更新验证
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(USER_CONSTRAINTS.NAME_MIN_LENGTH, `姓名至少需要${USER_CONSTRAINTS.NAME_MIN_LENGTH}个字符`)
    .max(USER_CONSTRAINTS.NAME_MAX_LENGTH, `姓名不能超过${USER_CONSTRAINTS.NAME_MAX_LENGTH}个字符`),
  email: z.string().min(1, '请输入邮箱地址').email('请输入有效的邮箱地址'),
});

// 下载跟踪验证
export const downloadTrackSchema = z.object({
  platform: z.enum(PLATFORMS),
  version: z.string().min(1, '版本号不能为空'),
  userAgent: z.string().optional(),
});

// 软件版本验证
export const softwareVersionSchema = z.object({
  version: z.string().min(1, '版本号不能为空'),
  platform: z.enum(PLATFORMS),
  downloadUrl: z.string().url('请输入有效的下载链接'),
  fileSize: z.number().positive('文件大小必须大于0'),
  checksum: z.string().min(1, '校验和不能为空'),
  releaseNotes: z.string().optional(),
  isActive: z.boolean().default(true),
});

// 管理员想法审核验证
export const ideaReviewSchema = z.object({
  status: z.enum(IDEA_STATUSES),
  adminComment: z.string().max(IDEA_CONSTRAINTS.ADMIN_COMMENT_MAX_LENGTH, `管理员评论不能超过${IDEA_CONSTRAINTS.ADMIN_COMMENT_MAX_LENGTH}个字符`).optional(),
});

// 搜索和筛选验证
export const searchIdeasSchema = z.object({
  query: z.string().max(SEARCH_CONSTRAINTS.MAX_QUERY_LENGTH, `搜索关键词不能超过${SEARCH_CONSTRAINTS.MAX_QUERY_LENGTH}个字符`).optional(),
  category: z.enum(IDEA_CATEGORIES).optional(),
  status: z.enum(IDEA_STATUSES).optional(),
  page: z.number().min(PAGINATION_CONSTRAINTS.MIN_PAGE, '页码必须大于0').default(PAGINATION_CONSTRAINTS.MIN_PAGE),
  limit: z.number().min(PAGINATION_CONSTRAINTS.MIN_LIMIT, '每页数量必须大于0').max(PAGINATION_CONSTRAINTS.MAX_LIMIT, `每页数量不能超过${PAGINATION_CONSTRAINTS.MAX_LIMIT}`).default(PAGINATION_CONSTRAINTS.DEFAULT_LIMIT),
});

// 分页验证
export const paginationSchema = z.object({
  page: z.number().min(PAGINATION_CONSTRAINTS.MIN_PAGE, '页码必须大于0').default(PAGINATION_CONSTRAINTS.MIN_PAGE),
  limit: z.number().min(PAGINATION_CONSTRAINTS.MIN_LIMIT, '每页数量必须大于0').max(PAGINATION_CONSTRAINTS.MAX_LIMIT, `每页数量不能超过${PAGINATION_CONSTRAINTS.MAX_LIMIT}`).default(PAGINATION_CONSTRAINTS.DEFAULT_LIMIT),
});

// 邮件验证
export const emailSchema = z.object({
  to: z.string().email('请输入有效的邮箱地址'),
  subject: z.string().min(1, '邮件主题不能为空').max(EMAIL_CONSTRAINTS.SUBJECT_MAX_LENGTH, `邮件主题不能超过${EMAIL_CONSTRAINTS.SUBJECT_MAX_LENGTH}个字符`),
  content: z.string().min(EMAIL_CONSTRAINTS.CONTENT_MIN_LENGTH, '邮件内容不能为空'),
  type: z.enum(EMAIL_TYPES),
});

// 导出类型
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type IdeaFormData = z.infer<typeof ideaSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
export type DownloadTrackData = z.infer<typeof downloadTrackSchema>;
export type SoftwareVersionData = z.infer<typeof softwareVersionSchema>;
export type IdeaReviewData = z.infer<typeof ideaReviewSchema>;
export type SearchIdeasData = z.infer<typeof searchIdeasSchema>;
export type PaginationData = z.infer<typeof paginationSchema>;
export type EmailData = z.infer<typeof emailSchema>;
