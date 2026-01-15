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
        <div class="site-info">
          <h3 class="site-name">{{ site.name }}</h3>
          <p class="site-desc">{{ site.desc }}</p>
        </div>
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
