# 抖音直播互动软件官网

这是一个为抖音直播互动Electron软件创建的官方网站，提供软件介绍、下载和用户反馈功能。

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式框架**: TailwindCSS 4.x
- **数据库**: Vercel Postgres
- **认证**: NextAuth.js
- **数据验证**: Zod
- **文件存储**: Vercel Blob
- **部署**: Vercel

## 功能特性

- 🎯 软件功能展示和介绍
- 📱 响应式设计，支持移动端
- 💾 多平台下载支持（Windows、Mac Intel、Mac M1）
- 💡 用户想法提交系统
- 👤 用户认证和个人仪表板
- 🔒 安全的数据处理和存储
- 📊 下载统计和分析

## 开发环境设置

1. 克隆项目
\`\`\`bash
git clone <repository-url>
cd douyin-live-website
\`\`\`

2. 安装依赖
\`\`\`bash
npm install
\`\`\`

3. 配置环境变量
\`\`\`bash
cp .env.example .env.local
# 编辑 .env.local 文件，填入相应的配置
\`\`\`

4. 启动开发服务器
\`\`\`bash
npm run dev
\`\`\`

## 可用脚本

- \`npm run dev\` - 启动开发服务器
- \`npm run build\` - 构建生产版本
- \`npm run start\` - 启动生产服务器
- \`npm run lint\` - 运行ESLint检查
- \`npm run format\` - 格式化代码
- \`npm run format:check\` - 检查代码格式
- \`npm run type-check\` - TypeScript类型检查

## 项目结构

\`\`\`
src/
├── app/                 # Next.js App Router页面
│   ├── api/            # API路由
│   ├── download/       # 下载页面
│   ├── ideas/          # 想法提交页面
│   ├── dashboard/      # 用户仪表板
│   └── admin/          # 管理员后台
├── components/         # React组件
│   ├── ui/            # 基础UI组件
│   ├── forms/         # 表单组件
│   └── layout/        # 布局组件
├── lib/               # 工具函数和配置
├── types/             # TypeScript类型定义
├── hooks/             # 自定义React Hooks
└── utils/             # 通用工具函数
\`\`\`

## 部署

项目配置为在Vercel平台上部署：

1. 连接GitHub仓库到Vercel
2. 配置环境变量
3. 自动部署

## 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 许可证

[MIT License](LICENSE)