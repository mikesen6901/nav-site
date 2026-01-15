<template>
  <div :class="['app', theme]">
    <!-- 头部 -->
    <header class="header">
      <div class="container">
        <h1 class="logo">🌟 专业导航站</h1>
        <div class="header-actions">
          <button @click="toggleTheme" class="theme-toggle">
            {{ theme === 'light' ? '🌙' : '☀️' }}
          </button>
        </div>
      </div>
    </header>

    <!-- 搜索区域 -->
    <section class="search-section">
      <div class="container">
        <div class="search-box">
          <select v-model="searchEngine" class="search-engine">
            <option value="baidu">百度</option>
            <option value="google">Google</option>
            <option value="bing">Bing</option>
          </select>
          <input 
            v-model="searchQuery" 
            @keyup.enter="handleSearch"
            type="text" 
            placeholder="搜索或输入网址..."
            class="search-input"
          >
          <button @click="handleSearch" class="search-btn">搜索</button>
        </div>
      </div>
    </section>

    <!-- 导航内容 -->
    <main class="main-content">
      <div class="container">
        <nav-category 
          v-for="category in categories" 
          :key="category.id"
          :category="category"
        />
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <p>© 2026 专业导航站 | Powered by Vue 3 + ESA</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavCategory from './components/NavCategory.vue'

const theme = ref('light')
const searchEngine = ref('baidu')
const searchQuery = ref('')

const categories = ref([
  {
    id: 1,
    name: '🔍 搜索引擎',
    sites: [
      { name: '百度', url: 'https://www.baidu.com', desc: '全球最大中文搜索', icon: '🔍' },
      { name: 'Google', url: 'https://www.google.com', desc: '全球搜索引擎', icon: 'G' },
      { name: 'Bing', url: 'https://www.bing.com', desc: '微软搜索引擎', icon: 'B' }
    ]
  },
  {
    id: 2,
    name: '💬 社交媒体',
    sites: [
      { name: '微博', url: 'https://weibo.com', desc: '中国社交平台', icon: '微' },
      { name: '知乎', url: 'https://www.zhihu.com', desc: '问答社区', icon: '知' },
      { name: 'Twitter', url: 'https://twitter.com', desc: '全球社交网络', icon: '𝕏' }
    ]
  },
  {
    id: 3,
    name: '🎬 视频娱乐',
    sites: [
      { name: '哔哩哔哩', url: 'https://www.bilibili.com', desc: '弹幕视频网站', icon: 'B' },
      { name: 'YouTube', url: 'https://www.youtube.com', desc: '全球视频平台', icon: '▶' },
      { name: '抖音', url: 'https://www.douyin.com', desc: '短视频平台', icon: '抖' }
    ]
  },
  {
    id: 4,
    name: '💻 开发工具',
    sites: [
      { name: 'GitHub', url: 'https://github.com', desc: '代码托管平台', icon: '🐙' },
      { name: 'Stack Overflow', url: 'https://stackoverflow.com', desc: '程序员问答', icon: 'SO' },
      { name: 'NPM', url: 'https://www.npmjs.com', desc: '包管理工具', icon: 'npm' },
      { name: 'MDN', url: 'https://developer.mozilla.org', desc: 'Web开发文档', icon: 'MDN' }
    ]
  },
  {
    id: 5,
    name: '🛒 电商购物',
    sites: [
      { name: '淘宝', url: 'https://www.taobao.com', desc: '网购平台', icon: '淘' },
      { name: '京东', url: 'https://www.jd.com', desc: '正品保障', icon: '京' },
      { name: 'Amazon', url: 'https://www.amazon.com', desc: '全球电商', icon: 'A' }
    ]
  }
])

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}

const handleSearch = () => {
  if (!searchQuery.value.trim()) return
  
  const engines = {
    baidu: `https://www.baidu.com/s?wd=${encodeURIComponent(searchQuery.value)}`,
    google: `https://www.google.com/search?q=${encodeURIComponent(searchQuery.value)}`,
    bing: `https://www.bing.com/search?q=${encodeURIComponent(searchQuery.value)}`
  }
  
  if (searchQuery.value.startsWith('http')) {
    window.open(searchQuery.value, '_blank')
  } else {
    window.open(engines[searchEngine.value], '_blank')
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) theme.value = savedTheme
})
</script>
