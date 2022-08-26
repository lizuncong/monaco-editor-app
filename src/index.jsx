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

class IRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/basic/create" component={Basic} />
            <Route path="/basic/format" component={Format} />
            <Redirect to="/basic/create" />
          </Switch>
        </App>
      </HashRouter>
    );
  }
}

ReactDOM.render(<IRouter />, document.getElementById("root"));
