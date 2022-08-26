const menuList = [
  {
    title: "基础",
    menuId: "1000",
    url: "/basic",
    children: [
      {
        title: "初始化实例",
        menuId: "1001",
        url: "/basic/create",
      },
    ],
  },
  {
    title: "进阶",
    menuId: "2000",
    url: "/advanced",
    children: [
      {
        title: "HTML标签未闭合检测",
        menuId: "2001",
        url: "/advanced/tagclosed",
      },
    ],
  },
];
export default menuList;
