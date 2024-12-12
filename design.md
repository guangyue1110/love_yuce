# 项目结构设计文档

## 目录结构 
├── src/
│ ├── app/
│ │ ├── fonts/ # 本地字体文件
│ │ ├── layout.tsx # 根布局
│ │ ├── page.tsx # 首页
│ │ └── globals.css # 全局样式
│ ├── components/ # 组件目录
│ └── pages/ # 页面目录
├── public/ # 静态资源
└── [配置文件]

## 技术栈

- **框架**: Next.js 15.0.4
- **运行时**: React 19
- **开发语言**: TypeScript
- **样式方案**: Tailwind CSS
- **代码规范**: ESLint
- **构建工具**: PostCSS

## 关键特性

### 1. 字体系统
- 使用 next/font 加载本地字体
- 支持 Geist Sans 和 Geist Mono 可变字体
- 字重范围: 100-900

### 2. 样式系统
- Tailwind CSS 实现响应式设计
- CSS 变量控制主题色
- 支持暗黑模式(通过 prefers-color-scheme)

### 3. TypeScript 配置
- 严格模式开启
- 模块解析使用 bundler
- 路径别名: @/* -> src/*

### 4. 开发工具
- ESLint 集成 Next.js 推荐配置
- PostCSS 处理 Tailwind
- 支持热更新

### 5. 部署配置
- 支持 Vercel 平台部署
- 环境变量配置(.env)
- 构建输出优化

## 注意事项

1. 字体文件较大,需要注意性能优化
2. 暗黑模式切换需要考虑用户体验
3. TypeScript 严格模式可能需要更多类型定义
4. 样式系统扩展需要遵循 Tailwind 配置

## 后续扩展建议

1. 添加状态管理方案
2. 集成测试框架
3. 添加国际化支持
4. 优化构建配置
5. 添加文档系统
