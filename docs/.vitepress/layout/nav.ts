const nav = [
  { text: "Home", link: "/" },  // 首页链接
  { text: "开发导航", link: "/views/nav/" },

  {
    text: "Demo",  // 演示下拉菜单
    items: [
      { text: "Blog", link: "/page/blog" },  // 博客页面链接
      { text: "Tags", link: "/page/tags" },  // 标签页面链接
      { text: "Archive", link: " /page/archive" },  // 归档页面链接
    ],
  },
  {
    text: "前端开发",
    items: [
      {
        text: "tailwindcss 🦄",
        link: "/views/tailwindcss/tailwindcss.md",
      },
      {
        text: "css 🦄",
        link: "/views/css/css.md",
      },
      {
        text: "构建工具 🦄",
        link: "/views/build-tools/index.md",
      },
      {
        text: "SSR 🦄",
        link: "/views/ssr/index.md",
      },
      {
        text: "Mock.js 🦄",
        link: "/views/mockjs/index.md",
      }
    ],
  },
  {
    text: "组件库",
    items: [
      {
        text: "vue 🚀",
        link: "/views/vue/index.md",
      },
      {
        text: "react 🚀",
        link: "/views/react/index.md",
      },
      {
        text: "Nuxt 🚀",
        link: "/views/nuxt/index.md",
      }
    ],
  },
];

export default nav;
