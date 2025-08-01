// 验证相关常量

// 用户相关常量
export const USER_CONSTRAINTS = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  PASSWORD_MIN_LENGTH: 8,
  EMAIL_MAX_LENGTH: 255,
} as const;

// 想法提交相关常量
export const IDEA_CONSTRAINTS = {
  TITLE_MIN_LENGTH: 5,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MIN_LENGTH: 20,
  DESCRIPTION_MAX_LENGTH: 2000,
  ADMIN_COMMENT_MAX_LENGTH: 500,
} as const;

// 想法分类
export const IDEA_CATEGORIES = [
  '功能建议',
  '界面优化', 
  '性能改进',
  '新功能',
  '其他'
] as const;

// 想法状态
export const IDEA_STATUSES = [
  'pending',
  'approved', 
  'rejected',
  'implemented'
] as const;

// 支持的平台
export const PLATFORMS = [
  'windows',
  'mac-intel',
  'mac-m1'
] as const;

// 文件上传相关常量
export const FILE_CONSTRAINTS = {
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
  ALLOWED_IMAGE_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp'
  ],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
} as const;

// 分页相关常量
export const PAGINATION_CONSTRAINTS = {
  MIN_PAGE: 1,
  MIN_LIMIT: 1,
  MAX_LIMIT: 100,
  DEFAULT_LIMIT: 10,
} as const;

// 搜索相关常量
export const SEARCH_CONSTRAINTS = {
  MAX_QUERY_LENGTH: 100,
} as const;

// 邮件相关常量
export const EMAIL_CONSTRAINTS = {
  SUBJECT_MAX_LENGTH: 200,
  CONTENT_MIN_LENGTH: 1,
} as const;

// 邮件类型
export const EMAIL_TYPES = [
  'welcome',
  'password-reset',
  'idea-confirmation',
  'admin-notification'
] as const;

// 错误代码
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  SERVER_ERROR: 'SERVER_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  DATABASE_ERROR: 'DATABASE_ERROR',
  FILE_UPLOAD_ERROR: 'FILE_UPLOAD_ERROR',
} as const;

// 用户角色
export const USER_ROLES = [
  'user',
  'admin'
] as const;

// 正则表达式模式
export const REGEX_PATTERNS = {
  PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
  CHINESE_NAME: /^[\u4e00-\u9fa5]{2,10}$/,
  PHONE_NUMBER: /^1[3-9]\d{9}$/,
  VERSION_NUMBER: /^\d+\.\d+\.\d+$/,
} as const;

// 速率限制
export const RATE_LIMITS = {
  AUTH_ATTEMPTS: 5, // 每小时最多5次认证尝试
  IDEA_SUBMISSIONS: 10, // 每天最多10个想法提交
  DOWNLOADS: 50, // 每小时最多50次下载
  PASSWORD_RESET: 3, // 每小时最多3次密码重置请求
} as const;