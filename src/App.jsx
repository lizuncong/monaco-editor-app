import React from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import MenuConfig from './menu';
import styles from "./app.module.less";
const { SubMenu } = Menu;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuTreeNode: [],
      currentUrl: "",
    };
  }
  componentWillMount() {
    const menuTreeNode = this.renderMenu(MenuConfig);
    const currentUrl = window.location.hash.replace(/#|\?.*$/g, "");
    this.setState({
      menuTreeNode,
      currentUrl,
    });
  }

  getMenuItemByUrl(url, menus) {
    for (let i = 0; i < menus.length; i += 1) {
      const menuItem = menus[i];
      if (
        (!menuItem.children || !menuItem.children.length) &&
        url.indexOf(menuItem.url) > -1
      ) {
        return menuItem;
      }
      if (menuItem.children && menuItem.children.length) {
        return this.getMenuItemByUrl(url, menuItem.children);
      }
    }
  }

  // 菜单渲染
  renderMenu(data) {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.url}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.url}>
          <NavLink to={item.url}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  }

  handleClick(menuItem) {
    const { changeMoreValue } = this.props;
    this.setState({
      currentUrl: menuItem.key,
    });
  }
  render() {
    const { children } = this.props;
    const { currentUrl, menuTreeNode } = this.state;
    return (
      <div className={styles.app}>
        <div className={styles.left}>
          <Menu
            mode="inline"
            onClick={(menuItem) => this.handleClick(menuItem)}
            selectedKeys={[currentUrl]}
            theme="dark"
          >
            {menuTreeNode}
          </Menu>
        </div>
        <div className={styles.main}>{children}</div>
      </div>
    );
  }
}

export default App;
