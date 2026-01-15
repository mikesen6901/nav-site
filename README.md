# 🌟 专业导航站 - Professional Navigation Site

<div align="center">

一个功能丰富、体验友好的现代化导航站，基于 Vue 3 + Vite 构建

[**🖥️ 在线演示**](https://nav-site-vue.0e384ff3.er.aliyun-esa.net)

</div>

---

## 📢 项目声明

**本项目由阿里云ESA提供加速、计算和保护**

<a href="https://esa.console.aliyun.com/">
   <img src="https://img.alicdn.com/imgextra/i3/O1CN01H1UU3i1Cti9lYtFrs_!!6000000000139-2-tps-7534-844.png" alt="Alibaba Cloud ESA Support" style="max-width: 100%; height: auto;">
</a>

---

## 💡 项目介绍

### 实用价值 (Application Value)

本项目是一个**高度实用的个人导航站**，解决了用户在日常工作和生活中频繁访问常用网站的痛点：

- **快速访问**：整合搜索引擎、社交媒体、视频娱乐、开发工具、电商购物等5大类常用网站
- **智能搜索**：支持多搜索引擎切换（百度/Google/Bing），可直接输入网址快速访问
- **主题切换**：深色/浅色主题自动保存，适应不同使用场景
- **响应式设计**：完美适配桌面、平板、手机等各种设备
- **零配置使用**：部署即用，无需任何配置，适合快速传播

### 创意卓越 (Creative Excellence)

- **现代化UI设计**：采用渐变色卡片、圆角设计、阴影效果，视觉效果美观
- **流畅动画**：卡片悬停动画、主题切换过渡动画，提升用户体验
- **Emoji图标**：使用Emoji作为网站图标，简洁直观，无需额外图片资源
- **一键搜索**：支持回车键快速搜索，提升操作效率
- **智能主题**：根据用户偏好自动记忆主题选择

### 技术探索 (Technical Exploration)

本项目充分利用了**阿里云ESA的完整边缘生态**：

1. **ESA Pages 静态托管**
   - 使用 `esa.jsonc` 配置自动构建和部署
   - 支持 SPA 单页应用模式
   - 全球 CDN 加速，访问速度快

2. **Vue 3 + Vite 技术栈**
   - 使用 Vue 3 Composition API
   - Vite 构建工具，开发体验优秀
   - 响应式数据管理

3. **性能优化**
   - CSS 和 JS 代码压缩
   - 使用 CSS 变量实现主题切换
   - LocalStorage 持久化用户偏好

4. **未来扩展性**
   - 预留边缘函数接口（用户自定义网站）
   - 预留边缘存储接口（数据持久化）
   - 预留缓存优化接口（热门数据）

---

## ✨ 核心功能

- 🎨 **深色/浅色主题切换** - 自动保存用户偏好
- 🔍 **多搜索引擎支持** - 百度/Google/Bing 一键切换
- 📱 **响应式设计** - 完美适配各种设备
- 🌐 **5大分类导航** - 覆盖日常常用网站
- ⚡ **快速搜索** - 支持直接输入网址访问
- 💾 **本地存储** - 主题偏好自动保存

---

## 🚀 快速开始

### 本地开发

1. **克隆项目**
   ```bash
   git clone https://github.com/mikesen6901/nav-site.git
   cd nav-site
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **构建生产版本**
   ```bash
   npm run build
   ```

### 部署到 ESA Pages

1. **推送到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/mikesen6901/nav-site.git
   git push -u origin main
   ```

2. **在 ESA Pages 控制台关联 GitHub 仓库**
   - 访问 [ESA Pages 控制台](https://esa.console.aliyun.com/)
   - 创建新项目，选择 GitHub 仓库
   - ESA 会自动读取 `esa.jsonc` 配置并构建部署

3. **访问你的导航站**
   - 部署完成后，ESA 会提供访问 URL

---

## 📦 技术栈

- **前端框架**: Vue 3
- **构建工具**: Vite
- **样式**: CSS3 (CSS Variables)
- **部署平台**: 阿里云 ESA Pages
- **版本控制**: Git

---

## 📁 项目结构

```
nav-project/
├── index.html              # 入口 HTML
├── package.json            # 项目配置
├── vite.config.js          # Vite 配置
├── esa.jsonc              # ESA Pages 配置
├── deploy.html            # 单文件部署版本
└── src/
    ├── main.js            # Vue 入口
    ├── App.vue            # 根组件
    ├── style.css          # 全局样式
    └── components/
        └── NavCategory.vue # 导航分类组件
```

---

## 🎯 未来规划

- [ ] 用户自定义网站功能（使用边缘存储）
- [ ] 搜索历史记录（使用边缘函数）
- [ ] 热门网站统计（使用缓存）
- [ ] AI 智能推荐
- [ ] 网站截图预览
- [ ] 拖拽排序
- [ ] 一键导入/导出

---

## 📄 开源协议

MIT License

---

## 🙏 致谢

感谢阿里云 ESA 提供的边缘计算平台支持！

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给个 Star！**

</div>
