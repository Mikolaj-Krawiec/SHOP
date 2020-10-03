import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { Auth0Provider } from "@auth0/auth0-react";

import {
  createMuiTheme,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import { store } from "./redux/store";

import { MainLayout } from "./components/layout/MainLayout/MainLayout";
import { Homepage } from "./components/views/Homepage/Homepage";
import { Post } from "./components/views/Post/Post";
import { PostEdit } from "./components/views/PostEdit/PostEdit";
import { PostAdd } from "./components/views/PostAdd/PostAdd";
import { NotFound } from "./components/views/NotFound/NotFound";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#2B4C6F" },
  },
});

const App = () => (
  <Auth0Provider
    domain="dev-lynix.eu.auth0.com"
    clientId="VG3xgSKYhhHPx7STv4OwAd6bF6KJNQwh"
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <BrowserRouter>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainLayout>
              <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/item/add" component={PostAdd} />
                <Route exact path="/item/:id" component={Post} />
                <Route exact path="/item/:id/edit" component={PostEdit} />
                <Route exact path="/profile" component={PostEdit} />
                <Route path="*" component={Homepage} />
              </Switch>
            </MainLayout>
          </ThemeProvider>
        </StylesProvider>
      </BrowserRouter>
    </Provider>
  </Auth0Provider>
);

export { App };
