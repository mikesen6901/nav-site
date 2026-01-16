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
        { id: 4, name: 'DuckDuckGo', url: 'https://duckduckgo.com', icon: '🦆' },
        { id: 5, name: '搜狗', url: 'https://www.sogou.com', icon: '🟠' },
        { id: 6, name: '360搜索', url: 'https://www.so.com', icon: '🔷' }
      ]
    },
    {
      id: 2,
      name: '💻 开发工具',
      sites: [
        { id: 10, name: 'GitHub', url: 'https://github.com', icon: '🐙' },
        { id: 11, name: 'GitLab', url: 'https://gitlab.com', icon: '🦊' },
        { id: 12, name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: '📚' },
        { id: 13, name: 'MDN', url: 'https://developer.mozilla.org', icon: '📖' },
        { id: 14, name: 'NPM', url: 'https://www.npmjs.com', icon: '📦' },
        { id: 15, name: 'CodePen', url: 'https://codepen.io', icon: '✏️' },
        { id: 16, name: 'JSFiddle', url: 'https://jsfiddle.net', icon: '🎯' },
        { id: 17, name: 'Can I Use', url: 'https://caniuse.com', icon: '✅' }
      ]
    },
    {
      id: 3,
      name: '🤖 AI 工具',
      sites: [
        { id: 20, name: 'ChatGPT', url: 'https://chat.openai.com', icon: '💬' },
        { id: 21, name: 'Claude', url: 'https://claude.ai', icon: '🤖' },
        { id: 22, name: 'Midjourney', url: 'https://www.midjourney.com', icon: '🎨' },
        { id: 23, name: 'Copilot', url: 'https://github.com/features/copilot', icon: '👨‍💻' },
        { id: 24, name: '文心一言', url: 'https://yiyan.baidu.com', icon: '🔮' },
        { id: 25, name: '通义千问', url: 'https://tongyi.aliyun.com', icon: '💡' },
        { id: 26, name: 'Gemini', url: 'https://gemini.google.com', icon: '✨' },
        { id: 27, name: 'Stable Diffusion', url: 'https://stablediffusionweb.com', icon: '🖼️' }
      ]
    },
    {
      id: 4,
      name: '🎨 设计资源',
      sites: [
        { id: 30, name: 'Dribbble', url: 'https://dribbble.com', icon: '🏀' },
        { id: 31, name: 'Behance', url: 'https://www.behance.net', icon: '🎭' },
        { id: 32, name: 'Figma', url: 'https://www.figma.com', icon: '🎨' },
        { id: 33, name: 'Unsplash', url: 'https://unsplash.com', icon: '📷' },
        { id: 34, name: 'Pexels', url: 'https://www.pexels.com', icon: '🖼️' },
        { id: 35, name: 'Iconfont', url: 'https://www.iconfont.cn', icon: '🎯' },
        { id: 36, name: 'Flaticon', url: 'https://www.flaticon.com', icon: '🔷' },
        { id: 37, name: 'Canva', url: 'https://www.canva.com', icon: '✨' }
      ]
    },
    {
      id: 5,
      name: '📚 学习平台',
      sites: [
        { id: 40, name: 'Coursera', url: 'https://www.coursera.org', icon: '🎓' },
        { id: 41, name: 'edX', url: 'https://www.edx.org', icon: '📖' },
        { id: 42, name: 'LeetCode', url: 'https://leetcode.com', icon: '💻' },
        { id: 43, name: 'FreeCodeCamp', url: 'https://www.freecodecamp.org', icon: '🔥' },
        { id: 44, name: 'Udemy', url: 'https://www.udemy.com', icon: '🎬' },
        { id: 45, name: 'B站', url: 'https://www.bilibili.com', icon: '📺' },
        { id: 46, name: '慕课网', url: 'https://www.imooc.com', icon: '🌐' },
        { id: 47, name: '极客时间', url: 'https://time.geekbang.org', icon: '⏰' }
      ]
    },
    {
      id: 6,
      name: '📰 资讯媒体',
      sites: [
        { id: 50, name: '36氪', url: 'https://36kr.com', icon: '📱' },
        { id: 51, name: '虎嗅', url: 'https://www.huxiu.com', icon: '🐯' },
        { id: 52, name: 'TechCrunch', url: 'https://techcrunch.com', icon: '🚀' },
        { id: 53, name: 'Hacker News', url: 'https://news.ycombinator.com', icon: '🔶' },
        { id: 54, name: 'Product Hunt', url: 'https://www.producthunt.com', icon: '🦄' },
        { id: 55, name: 'InfoQ', url: 'https://www.infoq.cn', icon: 'ℹ️' }
      ]
    },
    {
      id: 7,
      name: '🛠️ 开发框架',
      sites: [
        { id: 60, name: 'Vue.js', url: 'https://vuejs.org', icon: '💚' },
        { id: 61, name: 'React', url: 'https://react.dev', icon: '⚛️' },
        { id: 62, name: 'Angular', url: 'https://angular.io', icon: '🅰️' },
        { id: 63, name: 'Next.js', url: 'https://nextjs.org', icon: '▲' },
        { id: 64, name: 'Nuxt', url: 'https://nuxt.com', icon: '💚' },
        { id: 65, name: 'Svelte', url: 'https://svelte.dev', icon: '🔥' },
        { id: 66, name: 'Tailwind CSS', url: 'https://tailwindcss.com', icon: '🎨' },
        { id: 67, name: 'Bootstrap', url: 'https://getbootstrap.com', icon: '🅱️' }
      ]
    },
    {
      id: 8,
      name: '☁️ 云服务',
      sites: [
        { id: 70, name: '阿里云', url: 'https://www.aliyun.com', icon: '☁️' },
        { id: 71, name: '腾讯云', url: 'https://cloud.tencent.com', icon: '☁️' },
        { id: 72, name: 'AWS', url: 'https://aws.amazon.com', icon: '🟠' },
        { id: 73, name: 'Azure', url: 'https://azure.microsoft.com', icon: '🔵' },
        { id: 74, name: 'Vercel', url: 'https://vercel.com', icon: '▲' },
        { id: 75, name: 'Netlify', url: 'https://www.netlify.com', icon: '💎' },
        { id: 76, name: 'Cloudflare', url: 'https://www.cloudflare.com', icon: '🟠' }
      ]
    },
    {
      id: 9,
      name: '📝 效率工具',
      sites: [
        { id: 80, name: 'Notion', url: 'https://www.notion.so', icon: '📝' },
        { id: 81, name: '语雀', url: 'https://www.yuque.com', icon: '📚' },
        { id: 82, name: 'Trello', url: 'https://trello.com', icon: '📋' },
        { id: 83, name: 'Slack', url: 'https://slack.com', icon: '💬' },
        { id: 84, name: '飞书', url: 'https://www.feishu.cn', icon: '🚀' },
        { id: 85, name: '钉钉', url: 'https://www.dingtalk.com', icon: '📱' }
      ]
    },
    {
      id: 10,
      name: '🎬 视频平台',
      sites: [
        { id: 90, name: 'YouTube', url: 'https://www.youtube.com', icon: '▶️' },
        { id: 91, name: 'B站', url: 'https://www.bilibili.com', icon: '📺' },
        { id: 92, name: '抖音', url: 'https://www.douyin.com', icon: '🎵' },
        { id: 93, name: '快手', url: 'https://www.kuaishou.com', icon: '⚡' },
        { id: 94, name: '西瓜视频', url: 'https://www.ixigua.com', icon: '🍉' },
        { id: 95, name: 'Vimeo', url: 'https://vimeo.com', icon: '🎥' }
      ]
    },
    {
      id: 11,
      name: '🛒 电商购物',
      sites: [
        { id: 100, name: '淘宝', url: 'https://www.taobao.com', icon: '🛍️' },
        { id: 101, name: '京东', url: 'https://www.jd.com', icon: '🐶' },
        { id: 102, name: '拼多多', url: 'https://www.pinduoduo.com', icon: '🍊' },
        { id: 103, name: 'Amazon', url: 'https://www.amazon.com', icon: '📦' },
        { id: 104, name: '天猫', url: 'https://www.tmall.com', icon: '🐱' },
        { id: 105, name: '小红书', url: 'https://www.xiaohongshu.com', icon: '📕' }
      ]
    },
    {
      id: 12,
      name: '💰 金融理财',
      sites: [
        { id: 110, name: '支付宝', url: 'https://www.alipay.com', icon: '💙' },
        { id: 111, name: '微信支付', url: 'https://pay.weixin.qq.com', icon: '💚' },
        { id: 112, name: '雪球', url: 'https://xueqiu.com', icon: '⚪' },
        { id: 113, name: '同花顺', url: 'https://www.10jqka.com.cn', icon: '📈' },
        { id: 114, name: '东方财富', url: 'https://www.eastmoney.com', icon: '💰' }
      ]
    },
    {
      id: 13,
      name: '🎮 游戏娱乐',
      sites: [
        { id: 120, name: 'Steam', url: 'https://store.steampowered.com', icon: '🎮' },
        { id: 121, name: 'Epic Games', url: 'https://www.epicgames.com', icon: '🎯' },
        { id: 122, name: 'TapTap', url: 'https://www.taptap.cn', icon: '🎲' },
        { id: 123, name: '4399', url: 'https://www.4399.com', icon: '🕹️' },
        { id: 124, name: 'Twitch', url: 'https://www.twitch.tv', icon: '💜' }
      ]
    },
    {
      id: 14,
      name: '📱 社交媒体',
      sites: [
        { id: 130, name: '微信', url: 'https://weixin.qq.com', icon: '💬' },
        { id: 131, name: '微博', url: 'https://weibo.com', icon: '🔴' },
        { id: 132, name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
        { id: 133, name: 'Instagram', url: 'https://www.instagram.com', icon: '📷' },
        { id: 134, name: 'Facebook', url: 'https://www.facebook.com', icon: '📘' },
        { id: 135, name: 'LinkedIn', url: 'https://www.linkedin.com', icon: '💼' }
      ]
    },
    {
      id: 15,
      name: '📧 邮箱服务',
      sites: [
        { id: 140, name: 'Gmail', url: 'https://mail.google.com', icon: '📧' },
        { id: 141, name: 'Outlook', url: 'https://outlook.com', icon: '📨' },
        { id: 142, name: 'QQ邮箱', url: 'https://mail.qq.com', icon: '📮' },
        { id: 143, name: '163邮箱', url: 'https://mail.163.com', icon: '📬' },
        { id: 144, name: '126邮箱', url: 'https://mail.126.com', icon: '📭' }
      ]
    },
    {
      id: 16,
      name: '🗺️ 地图导航',
      sites: [
        { id: 150, name: '高德地图', url: 'https://www.amap.com', icon: '🗺️' },
        { id: 151, name: '百度地图', url: 'https://map.baidu.com', icon: '🧭' },
        { id: 152, name: '腾讯地图', url: 'https://map.qq.com', icon: '📍' },
        { id: 153, name: 'Google Maps', url: 'https://maps.google.com', icon: '🌍' }
      ]
    },
    {
      id: 17,
      name: '🎵 音乐平台',
      sites: [
        { id: 160, name: '网易云音乐', url: 'https://music.163.com', icon: '🎵' },
        { id: 161, name: 'QQ音乐', url: 'https://y.qq.com', icon: '🎶' },
        { id: 162, name: '酷狗音乐', url: 'https://www.kugou.com', icon: '🎧' },
        { id: 163, name: 'Spotify', url: 'https://www.spotify.com', icon: '🟢' },
        { id: 164, name: 'Apple Music', url: 'https://music.apple.com', icon: '🍎' }
      ]
    },
    {
      id: 18,
      name: '📖 阅读写作',
      sites: [
        { id: 170, name: '知乎', url: 'https://www.zhihu.com', icon: '💡' },
        { id: 171, name: '简书', url: 'https://www.jianshu.com', icon: '✍️' },
        { id: 172, name: 'Medium', url: 'https://medium.com', icon: 'Ⓜ️' },
        { id: 173, name: '掘金', url: 'https://juejin.cn', icon: '⛏️' },
        { id: 174, name: 'CSDN', url: 'https://www.csdn.net', icon: '💻' },
        { id: 175, name: '博客园', url: 'https://www.cnblogs.com', icon: '📝' }
      ]
    },
    {
      id: 19,
      name: '🏠 生活服务',
      sites: [
        { id: 180, name: '美团', url: 'https://www.meituan.com', icon: '🍔' },
        { id: 181, name: '饿了么', url: 'https://www.ele.me', icon: '🍜' },
        { id: 182, name: '12306', url: 'https://www.12306.cn', icon: '🚄' },
        { id: 183, name: '携程', url: 'https://www.ctrip.com', icon: '✈️' },
        { id: 184, name: '去哪儿', url: 'https://www.qunar.com', icon: '🧳' },
        { id: 185, name: '58同城', url: 'https://www.58.com', icon: '🏘️' }
      ]
    },
    {
      id: 20,
      name: '🔧 实用工具',
      sites: [
        { id: 190, name: 'JSON格式化', url: 'https://www.json.cn', icon: '📋' },
        { id: 191, name: '正则测试', url: 'https://regex101.com', icon: '🔍' },
        { id: 192, name: '图片压缩', url: 'https://tinypng.com', icon: '🖼️' },
        { id: 193, name: 'PDF工具', url: 'https://smallpdf.com', icon: '📄' },
        { id: 194, name: '在线PS', url: 'https://www.photopea.com', icon: '🎨' },
        { id: 195, name: '草料二维码', url: 'https://cli.im', icon: '📱' }
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
