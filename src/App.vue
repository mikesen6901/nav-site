<template>
  <div :class="['app', theme]">
    <!-- Fixed Header -->
    <header class="header-fixed">
      <div class="container">
        <div class="logo-section">
          <span class="logo-icon">🚀</span>
          <span class="logo-text">专业导航站</span>
        </div>
        <div class="header-actions">
          <button @click="$router.push('/admin')" class="admin-btn" title="后台管理">⚙️</button>
          <button @click="toggleTheme" class="theme-toggle" :title="theme === 'light' ? '切换暗色' : '切换亮色'">
            {{ theme === 'light' ? '🌙' : '☀️' }}
          </button>
        </div>
      </div>
    </header>

    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const theme = ref('dark')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
  document.documentElement.setAttribute('data-theme', theme.value)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'dark'
  theme.value = savedTheme
  document.documentElement.setAttribute('data-theme', savedTheme)
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root[data-theme="dark"] {
  --bg-primary: #0a0e27;
  --bg-secondary: rgba(255, 255, 255, 0.05);
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --accent: #4a9eff;
  --card-bg: rgba(255, 255, 255, 0.08);
  --card-hover: rgba(255, 255, 255, 0.12);
}

:root[data-theme="light"] {
  --bg-primary: #f5f7fa;
  --bg-secondary: #ffffff;
  --text-primary: #2c3e50;
  --text-secondary: #606266;
  --accent: #409eff;
  --card-bg: #ffffff;
  --card-hover: #f0f2f5;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.app {
  min-height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
}

.app::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 0;
}

.header-fixed .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 22px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.logo-icon {
  font-size: 28px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.admin-btn,
.theme-toggle {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 8px 16px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s;
  color: white;
}

.admin-btn:hover,
.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (max-width: 768px) {
  .logo-text {
    font-size: 16px;
  }
  .admin-btn, .theme-toggle {
    padding: 6px 12px;
    font-size: 18px;
  }
}
</style>
