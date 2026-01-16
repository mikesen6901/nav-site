<template>
  <div :class="['app', theme]">
    <!-- Fixed Menu Bar -->
    <div class="menu-bar-fixed">
      <div class="container">
        <div class="logo-section">
          <span class="logo-icon">🌟</span>
          <span class="logo-text">专业导航站</span>
        </div>
        <button @click="toggleTheme" class="theme-toggle">
          {{ theme === 'light' ? '🌙' : '☀️' }}
        </button>
      </div>
    </div>

    <!-- Search Section -->
    <section class="search-section">
      <div class="search-wrapper">
        <div class="search-engine-select">
          <button 
            v-for="engine in searchEngines" 
            :key="engine.name"
            :class="['engine-btn', {active: selectedEngine.name === engine.name}]"
            @click="selectEngine(engine)"
          >
            {{ engine.label }}
          </button>
        </div>
        <div class="search-container">
          <input 
            v-model="searchQuery" 
            @keypress.enter="handleSearch"
            type="text" 
            :placeholder="selectedEngine.placeholder" 
            class="search-input"
          />
          <button v-if="searchQuery" class="clear-btn" @click="clearSearch">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
          <button @click="handleSearch" class="search-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        <NavCategory 
          v-for="category in categories" 
          :key="category.id"
          :category="category"
        />
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>© 2026 专业导航站 | Powered by Vue 3 + ESA | <a href="https://github.com/mikesen6901/nav-site" target="_blank">GitHub</a></p>
      <p class="footer-note">本项目由阿里云ESA提供加速、计算和保护</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavCategory from './components/NavCategory.vue'

const theme = ref('light')
const searchQuery = ref('')
const selectedEngine = ref(null)

const searchEngines = [
  { name: 'baidu', label: '百度', placeholder: '百度搜索...', url: q => `https://www.baidu.com/s?wd=${encodeURIComponent(q)}` },
  { name: 'google', label: 'Google', placeholder: 'Google 搜索...', url: q => `https://www.google.com/search?q=${encodeURIComponent(q)}` },
  { name: 'bing', label: 'Bing', placeholder: 'Bing 搜索...', url: q => `https://www.bing.com/search?q=${encodeURIComponent(q)}` },
  { name: 'github', label: 'GitHub', placeholder: 'GitHub 搜索...', url: q => `https://github.com/search?q=${encodeURIComponent(q)}` }
]

const categories = ref([
  {
    id: 1,
    name: '🔍 搜索引擎',
    sites: [
      { name: '百度', url: 'https://www.baidu.com', icon: '🔍' },
      { name: 'Google', url: 'https://www.google.com', icon: 'G' },
      { name: 'Bing', url: 'https://www.bing.com', icon: 'B' },
      { name: 'DuckDuckGo', url: 'https://duckduckgo.com', icon: '🦆' }
    ]
  },
  {
    id: 2,
    name: '💻 开发工具',
    sites: [
      { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
      { name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: 'SO' },
      { name: 'MDN', url: 'https://developer.mozilla.org', icon: 'MDN' },
      { name: 'NPM', url: 'https://www.npmjs.com', icon: 'npm' },
      { name: 'CodePen', url: 'https://codepen.io', icon: '✏️' },
      { name: 'JSFiddle', url: 'https://jsfiddle.net', icon: 'JS' }
    ]
  },
  {
    id: 3,
    name: '🎨 设计资源',
    sites: [
      { name: 'Dribbble', url: 'https://dribbble.com', icon: '🏀' },
      { name: 'Behance', url: 'https://www.behance.net', icon: 'Be' },
      { name: 'Figma', url: 'https://www.figma.com', icon: 'F' },
      { name: 'Unsplash', url: 'https://unsplash.com', icon: '📷' },
      { name: 'Iconfont', url: 'https://www.iconfont.cn', icon: '🎯' },
      { name: 'Flaticon', url: 'https://www.flaticon.com', icon: '🎨' }
    ]
  },
  {
    id: 4,
    name: '🤖 AI工具',
    sites: [
      { name: 'ChatGPT', url: 'https://chat.openai.com', icon: '💬' },
      { name: 'Claude', url: 'https://claude.ai', icon: '🤖' },
      { name: 'Midjourney', url: 'https://www.midjourney.com', icon: '🎨' },
      { name: 'Stable Diffusion', url: 'https://stablediffusionweb.com', icon: '🖼️' },
      { name: 'Notion AI', url: 'https://www.notion.so/product/ai', icon: '📝' },
      { name: 'Copilot', url: 'https://github.com/features/copilot', icon: '👨‍💻' }
    ]
  },
  {
    id: 5,
    name: '📚 学习平台',
    sites: [
      { name: 'Coursera', url: 'https://www.coursera.org', icon: '🎓' },
      { name: 'edX', url: 'https://www.edx.org', icon: '📖' },
      { name: 'Udemy', url: 'https://www.udemy.com', icon: '💡' },
      { name: 'FreeCodeCamp', url: 'https://www.freecodecamp.org', icon: '🔥' },
      { name: 'LeetCode', url: 'https://leetcode.com', icon: '💻' },
      { name: 'Codecademy', url: 'https://www.codecademy.com', icon: '📚' }
    ]
  },
  {
    id: 6,
    name: '💬 社交媒体',
    sites: [
      { name: '微博', url: 'https://weibo.com', icon: '微' },
      { name: '知乎', url: 'https://www.zhihu.com', icon: '知' },
      { name: 'Twitter', url: 'https://twitter.com', icon: '𝕏' },
      { name: 'Reddit', url: 'https://www.reddit.com', icon: 'R' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com', icon: 'in' },
      { name: 'Discord', url: 'https://discord.com', icon: '💬' }
    ]
  },
  {
    id: 7,
    name: '🎬 视频娱乐',
    sites: [
      { name: '哔哩哔哩', url: 'https://www.bilibili.com', icon: 'B' },
      { name: 'YouTube', url: 'https://www.youtube.com', icon: '▶' },
      { name: '抖音', url: 'https://www.douyin.com', icon: '抖' },
      { name: 'Netflix', url: 'https://www.netflix.com', icon: 'N' },
      { name: 'Twitch', url: 'https://www.twitch.tv', icon: '🎮' },
      { name: 'TikTok', url: 'https://www.tiktok.com', icon: '🎵' }
    ]
  },
  {
    id: 8,
    name: '🛒 电商购物',
    sites: [
      { name: '淘宝', url: 'https://www.taobao.com', icon: '淘' },
      { name: '京东', url: 'https://www.jd.com', icon: '京' },
      { name: 'Amazon', url: 'https://www.amazon.com', icon: 'A' },
      { name: '拼多多', url: 'https://www.pinduoduo.com', icon: '拼' },
      { name: 'eBay', url: 'https://www.ebay.com', icon: 'e' },
      { name: 'AliExpress', url: 'https://www.aliexpress.com', icon: 'AE' }
    ]
  },
  {
    id: 9,
    name: '📰 新闻资讯',
    sites: [
      { name: '今日头条', url: 'https://www.toutiao.com', icon: '头' },
      { name: '腾讯新闻', url: 'https://news.qq.com', icon: 'Q' },
      { name: '新浪新闻', url: 'https://news.sina.com.cn', icon: '新' },
      { name: 'BBC', url: 'https://www.bbc.com', icon: 'BBC' },
      { name: 'CNN', url: 'https://www.cnn.com', icon: 'CNN' },
      { name: 'Reuters', url: 'https://www.reuters.com', icon: 'R' }
    ]
  },
  {
    id: 10,
    name: '⚡ 效率工具',
    sites: [
      { name: 'Notion', url: 'https://www.notion.so', icon: 'N' },
      { name: 'Trello', url: 'https://trello.com', icon: 'T' },
      { name: 'Slack', url: 'https://slack.com', icon: 'S' },
      { name: 'Zoom', url: 'https://zoom.us', icon: 'Z' },
      { name: 'Dropbox', url: 'https://www.dropbox.com', icon: '📦' },
      { name: 'Google Drive', url: 'https://drive.google.com', icon: 'GD' }
    ]
  }
])

selectedEngine.value = searchEngines[0]

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}

const selectEngine = (engine) => {
  selectedEngine.value = engine
}

const clearSearch = () => {
  searchQuery.value = ''
}

const handleSearch = () => {
  if (!searchQuery.value.trim()) return
  if (searchQuery.value.startsWith('http')) {
    window.open(searchQuery.value, '_blank')
  } else {
    window.open(selectedEngine.value.url(searchQuery.value), '_blank')
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) theme.value = savedTheme
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1519681393784-d120267933ba');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
}

.app::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.menu-bar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  padding: 12px 0;
}

.menu-bar-fixed .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  font-size: 20px;
  font-weight: 700;
}

.theme-toggle {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
}

.search-section {
  padding: 100px 0 40px;
  position: relative;
  z-index: 2;
}

.search-wrapper {
  max-width: 600px;
  margin: 0 auto;
}

.search-engine-select {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
}

.engine-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 6px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.engine-btn.active,
.engine-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.search-container {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  padding: 12px 20px;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  outline: none;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.clear-btn,
.search-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  color: white;
}

.main-content {
  position: relative;
  z-index: 2;
  padding-bottom: 80px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 30px 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.footer a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
}

.footer-note {
  font-size: 12px;
  margin-top: 8px;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .search-engine-select {
    flex-wrap: wrap;
  }
  
  .engine-btn {
    font-size: 12px;
    padding: 4px 12px;
  }
}
</style>
