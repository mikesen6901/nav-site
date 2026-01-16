<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1>🔧 后台管理</h1>
      <button @click="logout" class="btn-logout">退出</button>
    </div>

    <div v-if="!isLoggedIn" class="login-box">
      <h2>管理员登录</h2>
      <input v-model="password" type="password" placeholder="请输入密码" @keyup.enter="login" />
      <button @click="login">登录</button>
    </div>

    <div v-else class="admin-content">
      <div class="tabs">
        <button :class="{active: tab === 'category'}" @click="tab = 'category'">分类管理</button>
        <button :class="{active: tab === 'site'}" @click="tab = 'site'">网站管理</button>
      </div>

      <div v-if="tab === 'category'" class="tab-content">
        <button @click="showAddCategory = true" class="btn-add">+ 添加分类</button>
        <div class="category-list">
          <div v-for="cat in categories" :key="cat.id" class="category-item">
            <span>{{ cat.icon }} {{ cat.name }}</span>
            <button @click="deleteCategory(cat.id)" class="btn-delete">删除</button>
          </div>
        </div>
      </div>

      <div v-if="tab === 'site'" class="tab-content">
        <button @click="showAddSite = true" class="btn-add">+ 添加网站</button>
        <div class="site-list">
          <div v-for="cat in categories" :key="cat.id" class="site-category">
            <h3>{{ cat.icon }} {{ cat.name }}</h3>
            <div class="sites">
              <div v-for="site in cat.sites" :key="site.id" class="site-item">
                <span>{{ site.icon }} {{ site.name }}</span>
                <button @click="deleteSite(cat.id, site.id)" class="btn-delete">删除</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showAddCategory" class="modal" @click.self="showAddCategory = false">
      <div class="modal-content">
        <h3>添加分类</h3>
        <input v-model="newCategory.name" placeholder="分类名称" />
        <input v-model="newCategory.icon" placeholder="图标 Emoji" />
        <button @click="addCategory">确定</button>
        <button @click="showAddCategory = false">取消</button>
      </div>
    </div>

    <div v-if="showAddSite" class="modal" @click.self="showAddSite = false">
      <div class="modal-content">
        <h3>添加网站</h3>
        <select v-model="newSite.categoryId">
          <option value="">选择分类</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
        <input v-model="newSite.name" placeholder="网站名称" />
        <input v-model="newSite.url" placeholder="网站地址" @blur="fetchIcon" />
        <input v-model="newSite.icon" placeholder="图标 Emoji" />
        <button @click="addSite">确定</button>
        <button @click="showAddSite = false">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const API_BASE = '/api';
const isLoggedIn = ref(false);
const password = ref('');
const token = ref('');
const tab = ref('category');
const categories = ref([]);
const showAddCategory = ref(false);
const showAddSite = ref(false);
const newCategory = ref({ name: '', icon: '' });
const newSite = ref({ categoryId: '', name: '', url: '', icon: '' });

onMounted(() => {
  const savedToken = localStorage.getItem('admin_token');
  if (savedToken) {
    token.value = savedToken;
    isLoggedIn.value = true;
    loadData();
  }
});

async function login() {
  try {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password.value })
    });
    const data = await res.json();
    if (data.token) {
      token.value = data.token;
      localStorage.setItem('admin_token', data.token);
      isLoggedIn.value = true;
      loadData();
    } else {
      alert('密码错误');
    }
  } catch (e) {
    alert('登录失败');
  }
}

function logout() {
  localStorage.removeItem('admin_token');
  isLoggedIn.value = false;
  token.value = '';
}

async function loadData() {
  const res = await fetch(`${API_BASE}/nav`);
  const data = await res.json();
  categories.value = data.categories;
}

async function addCategory() {
  const id = Date.now().toString();
  await fetch(`${API_BASE}/admin/category`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    },
    body: JSON.stringify({ ...newCategory.value, id, order: categories.value.length, sites: [] })
  });
  showAddCategory.value = false;
  newCategory.value = { name: '', icon: '' };
  loadData();
}

async function deleteCategory(id) {
  if (!confirm('确定删除？')) return;
  await fetch(`${API_BASE}/admin/category/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token.value}` }
  });
  loadData();
}

async function addSite() {
  const id = Date.now().toString();
  await fetch(`${API_BASE}/admin/site`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    },
    body: JSON.stringify({
      categoryId: newSite.value.categoryId,
      site: { id, ...newSite.value }
    })
  });
  showAddSite.value = false;
  newSite.value = { categoryId: '', name: '', url: '', icon: '' };
  loadData();
}

async function deleteSite(categoryId, siteId) {
  if (!confirm('确定删除？')) return;
  await fetch(`${API_BASE}/admin/site/${categoryId}/${siteId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token.value}` }
  });
  loadData();
}

async function fetchIcon() {
  if (!newSite.value.url) return;
  try {
    const url = new URL(newSite.value.url);
    const faviconUrl = `${url.origin}/favicon.ico`;
    newSite.value.icon = `🌐`;
  } catch (e) {}
}
</script>

<style scoped>
.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.login-box {
  max-width: 400px;
  margin: 100px auto;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
.login-box input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.tabs button {
  padding: 10px 20px;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
  border-radius: 5px;
}
.tabs button.active {
  background: #4CAF50;
  color: white;
}
.btn-add {
  padding: 10px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}
.category-item, .site-item {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: white;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.btn-delete {
  padding: 5px 15px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  min-width: 400px;
}
.modal-content input, .modal-content select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.modal-content button {
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.site-category {
  margin: 20px 0;
}
</style>
