<template>
  <div class="home-page">
    <!-- Search Section -->
    <section class="search-section">
      <div class="search-wrapper">
        <div class="search-engine-tabs">
          <button
            v-for="engine in searchEngines"
            :key="engine.name"
            :class="['engine-tab', {active: selectedEngine.name === engine.name}]"
            @click="selectedEngine = engine"
          >
            {{ engine.label }}
          </button>
        </div>
        <div class="search-box">
          <input
            v-model="searchQuery"
            @keypress.enter="handleSearch"
            type="text"
            :placeholder="selectedEngine.placeholder"
            class="search-input"
          />
          <button v-if="searchQuery" class="clear-btn" @click="searchQuery = ''">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          <button @click="handleSearch" class="search-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Navigation Categories -->
    <main class="main-content">
      <div class="container">
        <div v-for="category in categories" :key="category.id" class="category-section">
          <h2 class="category-title">{{ category.name }}</h2>
          <div class="sites-grid">
            <a
              v-for="site in category.sites"
              :key="site.id"
              :href="site.url"
              target="_blank"
              class="site-card"
            >
              <div class="site-icon">{{ site.icon }}</div>
              <div class="site-name">{{ site.name }}</div>
            </a>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <p>© 2026 专业导航站 | Powered by Vue 3 + ESA Pages</p>
        <p class="footer-note">本项目由阿里云ESA提供加速、计算和保护</p>
        <a href="https://github.com/mikesen6901/nav-site" target="_blank" class="github-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const searchQuery = ref('')
const searchEngines = [
  { name: 'baidu', label: '百度', placeholder: '百度一下...', url: q => `https://www.baidu.com/s?wd=${encodeURIComponent(q)}` },
  { name: 'google', label: 'Google', placeholder: 'Google Search...', url: q => `https://www.google.com/search?q=${encodeURIComponent(q)}` },
  { name: 'bing', label: 'Bing', placeholder: 'Bing Search...', url: q => `https://www.bing.com/search?q=${encodeURIComponent(q)}` },
  { name: 'github', label: 'GitHub', placeholder: 'Search GitHub...', url: q => `https://github.com/search?q=${encodeURIComponent(q)}` }
]
const selectedEngine = ref(searchEngines[0])

const categories = ref([
  {
    id: 1,
    name: '🔍 搜索引擎',
    sites: [
      { id: 1, name: '百度', url: 'https://www.baidu.com', icon: '🔵' },
      { id: 2, name: 'Google', url: 'https://www.google.com', icon: '🔴' },
      { id: 3, name: 'Bing', url: 'https://www.bing.com', icon: '🟢' },
      { id: 4, name: 'DuckDuckGo', url: 'https://duckduckgo.com', icon: '🦆' }
    ]
  },
  {
    id: 2,
    name: '💻 开发工具',
    sites: [
      { id: 5, name: 'GitHub', url: 'https://github.com', icon: '🐙' },
      { id: 6, name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: '📚' },
      { id: 7, name: 'MDN', url: 'https://developer.mozilla.org', icon: '📖' },
      { id: 8, name: 'NPM', url: 'https://www.npmjs.com', icon: '📦' },
      { id: 9, name: 'CodePen', url: 'https://codepen.io', icon: '✏️' },
      { id: 10, name: 'JSFiddle', url: 'https://jsfiddle.net', icon: '🎯' }
    ]
  },
  {
    id: 3,
    name: '🤖 AI工具',
    sites: [
      { id: 11, name: 'ChatGPT', url: 'https://chat.openai.com', icon: '💬' },
      { id: 12, name: 'Claude', url: 'https://claude.ai', icon: '🤖' },
      { id: 13, name: 'Midjourney', url: 'https://www.midjourney.com', icon: '🎨' },
      { id: 14, name: 'Copilot', url: 'https://github.com/features/copilot', icon: '👨‍💻' }
    ]
  },
  {
    id: 4,
    name: '🎨 设计资源',
    sites: [
      { id: 15, name: 'Dribbble', url: 'https://dribbble.com', icon: '🏀' },
      { id: 16, name: 'Behance', url: 'https://www.behance.net', icon: '🎭' },
      { id: 17, name: 'Figma', url: 'https://www.figma.com', icon: '🎨' },
      { id: 18, name: 'Unsplash', url: 'https://unsplash.com', icon: '📷' }
    ]
  },
  {
    id: 5,
    name: '📚 学习平台',
    sites: [
      { id: 19, name: 'Coursera', url: 'https://www.coursera.org', icon: '🎓' },
      { id: 20, name: 'edX', url: 'https://www.edx.org', icon: '📖' },
      { id: 21, name: 'LeetCode', url: 'https://leetcode.com', icon: '💻' },
      { id: 22, name: 'FreeCodeCamp', url: 'https://www.freecodecamp.org', icon: '🔥' }
    ]
  }
])

const handleSearch = () => {
  if (!searchQuery.value.trim()) return
  if (searchQuery.value.startsWith('http')) {
    window.open(searchQuery.value, '_blank')
  } else {
    window.open(selectedEngine.value.url(searchQuery.value), '_blank')
  }
}

onMounted(async () => {
  // 从 API 加载数据
  try {
    const res = await fetch('/api/nav')
    const data = await res.json()
    if (data.categories) {
      categories.value = data.categories
    }
  } catch (e) {
    console.log('使用默认数据')
  }
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.search-section {
  padding: 120px 20px 60px;
  display: flex;
  justify-content: center;
}

.search-wrapper {
  width: 100%;
  max-width: 650px;
}

.search-engine-tabs {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.engine-tab {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.engine-tab.active,
.engine-tab:hover {
  background: rgba(255, 255, 255, 0.25);
  color: white;
  border-color: rgba(255, 255, 255, 0.4);
}

.search-box {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 14px 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
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
  color: rgba(255, 255, 255, 0.5);
}

.clear-btn,
.search-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s;
}

.clear-btn:hover,
.search-btn:hover {
  color: white;
  transform: scale(1.1);
}

.main-content {
  padding: 0 20px 80px;
}

.category-section {
  margin-bottom: 50px;
}

.category-title {
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-bottom: 20px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.sites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
}

.site-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 24px 16px;
  text-align: center;
  text-decoration: none;
  color: white;
  transition: all 0.3s;
  cursor: pointer;
}

.site-card:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.site-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.site-name {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.95);
}

.footer {
  padding: 40px 20px;
  text-align: center;
}

.footer-content {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.footer-content p {
  margin: 8px 0;
}

.footer-note {
  font-size: 12px;
  opacity: 0.8;
}

.github-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-top: 12px;
  transition: all 0.3s;
}

.github-link:hover {
  color: white;
}

@media (max-width: 768px) {
  .sites-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 12px;
  }

  .site-card {
    padding: 20px 12px;
  }

  .site-icon {
    font-size: 32px;
  }

  .site-name {
    font-size: 12px;
  }

  .category-title {
    font-size: 20px;
  }
}
</style>
