// ESA 边缘函数入口文件
const ADMIN_PASSWORD = 'admin123'; // 管理员密码
const KV_NAMESPACE = 'nav_data'; // KV 命名空间

// 初始化 Edge KV
const edgeKv = new EdgeKV({ namespace: KV_NAMESPACE });

// 默认导航数据
const DEFAULT_DATA = {
  categories: [
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
        { id: 8, name: 'NPM', url: 'https://www.npmjs.com', icon: '📦' }
      ]
    },
    {
      id: 3,
      name: '🤖 AI工具',
      sites: [
        { id: 11, name: 'ChatGPT', url: 'https://chat.openai.com', icon: '💬' },
        { id: 12, name: 'Claude', url: 'https://claude.ai', icon: '🤖' }
      ]
    }
  ]
};

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // 只处理 API 路由，其他请求不处理
  if (!path.startsWith('/api/')) {
    return fetch(request);
  }

  // CORS 头
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    return await handleAPI(request, path, corsHeaders);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

async function handleAPI(request, path, corsHeaders) {
  // 验证管理员权限
  const requireAuth = path.startsWith('/api/admin/');
  if (requireAuth) {
    const auth = request.headers.get('Authorization');
    if (!auth || auth !== `Bearer ${ADMIN_PASSWORD}`) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: corsHeaders
      });
    }
  }

  // 获取所有导航数据
  if (path === '/api/nav' && request.method === 'GET') {
    let data = await edgeKv.get('nav_data');
    if (!data) {
      await edgeKv.put('nav_data', JSON.stringify(DEFAULT_DATA));
      data = JSON.stringify(DEFAULT_DATA);
    }
    return new Response(data, { headers: corsHeaders });
  }

  // 管理员登录
  if (path === '/api/admin/login' && request.method === 'POST') {
    const body = await request.json();
    if (body.password === ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ token: ADMIN_PASSWORD }), {
        headers: corsHeaders
      });
    }
    return new Response(JSON.stringify({ error: 'Invalid password' }), {
      status: 401,
      headers: corsHeaders
    });
  }

  // 更新导航数据
  if (path === '/api/admin/nav' && request.method === 'PUT') {
    const body = await request.json();
    await edgeKv.put('nav_data', JSON.stringify(body));
    return new Response(JSON.stringify({ success: true }), {
      headers: corsHeaders
    });
  }

  // 添加分类
  if (path === '/api/admin/category' && request.method === 'POST') {
    const body = await request.json();
    let data = JSON.parse(await edgeKv.get('nav_data') || JSON.stringify(DEFAULT_DATA));
    data.categories.push(body);
    await edgeKv.put('nav_data', JSON.stringify(data));
    return new Response(JSON.stringify({ success: true }), {
      headers: corsHeaders
    });
  }

  // 删除分类
  if (path.startsWith('/api/admin/category/') && request.method === 'DELETE') {
    const id = path.split('/').pop();
    let data = JSON.parse(await edgeKv.get('nav_data') || JSON.stringify(DEFAULT_DATA));
    data.categories = data.categories.filter(c => c.id !== id);
    await edgeKv.put('nav_data', JSON.stringify(data));
    return new Response(JSON.stringify({ success: true }), {
      headers: corsHeaders
    });
  }

  // 添加网站
  if (path === '/api/admin/site' && request.method === 'POST') {
    const body = await request.json();
    let data = JSON.parse(await edgeKv.get('nav_data') || JSON.stringify(DEFAULT_DATA));
    const category = data.categories.find(c => c.id === body.categoryId);
    if (category) {
      category.sites.push(body.site);
      await edgeKv.put('nav_data', JSON.stringify(data));
    }
    return new Response(JSON.stringify({ success: true }), {
      headers: corsHeaders
    });
  }

  // 删除网站
  if (path.startsWith('/api/admin/site/') && request.method === 'DELETE') {
    const [categoryId, siteId] = path.split('/').slice(-2);
    let data = JSON.parse(await edgeKv.get('nav_data') || JSON.stringify(DEFAULT_DATA));
    const category = data.categories.find(c => c.id === categoryId);
    if (category) {
      category.sites = category.sites.filter(s => s.id !== siteId);
      await edgeKv.put('nav_data', JSON.stringify(data));
    }
    return new Response(JSON.stringify({ success: true }), {
      headers: corsHeaders
    });
  }

  return new Response('Not Found', { status: 404, headers: corsHeaders });
}

export default {
  async fetch(request) {
    return handleRequest(request);
  }
};
