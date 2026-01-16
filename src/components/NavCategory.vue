<template>
  <section class="nav-category">
    <h2 class="category-title">{{ category.name }}</h2>
    <div class="sites-grid">
      <a 
        v-for="site in category.sites" 
        :key="site.name"
        :href="site.url" 
        target="_blank"
        class="site-card"
      >
        <div class="site-icon">{{ site.icon }}</div>
        <span class="site-name">{{ site.name }}</span>
      </a>
    </div>
  </section>
</template>

<script setup>
defineProps({
  category: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.nav-category {
  margin-bottom: 40px;
}

.category-title {
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  padding-left: 8px;
}

.sites-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
}

.site-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 16px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  transition: all 0.3s;
  min-height: 85px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.site-card:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.site-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.site-name {
  font-size: 13px;
  text-align: center;
  word-break: break-all;
  line-height: 1.2;
}

@media (max-width: 1200px) {
  .sites-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .sites-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  
  .site-card {
    padding: 12px 6px;
    min-height: 75px;
  }
  
  .site-icon {
    font-size: 20px;
  }
  
  .site-name {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .sites-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
