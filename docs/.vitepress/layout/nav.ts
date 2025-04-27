const nav = [
  { text: "Home", link: "/" },  // 首页链接
  { text: "开发导航", link: "/views/nav/" },
  {
    text: "博客",  // 演示下拉菜单
    items: [
      { text: "Home", link: "/page/blog" },  // 博客页面链接
      { text: "Tags", link: "/page/tags" },  // 标签页面链接
      { text: "Archive", link: " /page/archive" },  // 归档页面链接
    ],
  },
];

export default nav;
