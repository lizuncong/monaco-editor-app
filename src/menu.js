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
      {
        title: "代码格式化",
        menuId: "1002",
        url: "/basic/format",
      },
      {
        title: "重新布局",
        menuId: "1003",
        url: "/basic/relayout",
      },
      {
        title: "监听代码编辑",
        menuId: "1004",
        url: "/basic/ontextchange",
      },
    ],
  },
  {
    title: "进阶",
    menuId: "2000",
    url: "/advanced",
    children: [
      {
        title: "HTML标签自动闭合",
        menuId: "2001",
        url: "/advanced/autoclose",
      },
      {
        title: "HTML标签未闭合检测",
        menuId: "2002",
        url: "/advanced/tagcheck",
      },
    ],
  },
];
export default menuList;
