import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
import loadable from "@loadable/component";
import "./index.css";
import App from "./App";

const Basic = loadable(() =>
  import(/* webpackChunkName: "basic" */ "./pages/basic")
);

const Format = loadable(() =>
  import(/* webpackChunkName: "format" */ "./pages/format")
);

const ReLayout = loadable(() =>
  import(/* webpackChunkName: "relayout" */ "./pages/relayout")
);

const OnTextChange = loadable(() =>
  import(/* webpackChunkName: "ontextchange" */ "./pages/onchange")
);

const AutoClose = loadable(() =>
  import(/* webpackChunkName: "autoclose" */ "./pages/autoComplete")
);

const TagCheck = loadable(() =>
  import(/* webpackChunkName: "tagcheck" */ "./pages/tagCheck")
);

const ContextMenu = loadable(() =>
  import(/* webpackChunkName: "contextmenu" */ "./pages/contextMenu")
);

const CustomTheme = loadable(() =>
  import(/* webpackChunkName: "customtheme" */ "./pages/customThemes")
);

const TestPage = loadable(() =>
  import(/* webpackChunkName: "customtheme" */ "./pages/testPage")
);


class IRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/basic/create" component={Basic} />
            <Route path="/basic/format" component={Format} />
            <Route path="/basic/ontextchange" component={OnTextChange} />
            <Route path="/basic/relayout" component={ReLayout} />
            <Route path="/basic/contextMenu" component={ContextMenu} />
            <Route path="/basic/customtheme" component={CustomTheme} />
            <Route path="/advanced/autoclose" component={AutoClose} />
            <Route path="/advanced/tagcheck" component={TagCheck} />
            <Route path="/advanced/TestPage" component={TestPage} />
            <Redirect to="/basic/create" />
          </Switch>
        </App>
      </HashRouter>
    );
  }
}

ReactDOM.render(<IRouter />, document.getElementById("root"));
