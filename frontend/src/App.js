import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import {
  createMuiTheme,
  StylesProvider,
  ThemeProvider,
} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { ProtectedRoute } from './components/common/ProtectedRoute/ProtectedRoute';
import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { Profile } from './components/views/Profile/Profile';
import { Cart } from './components/views/Cart/Cart';
import { Item } from './components/views/Item/Item';
import { Auth } from './components/views/Auth/Auth';

const theme = createMuiTheme({
  palette: {
    // primary: { main: "#2B4C6F" },
    primary: { main: '#eee' },
    secondary: { main: 'rgb(88, 88, 88)' },
  },
});

const Component = () => {
  return (
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/items/:id" component={Item} />
              <ProtectedRoute exact path="/cart" component={Cart} />
              <ProtectedRoute exact path="/profile" component={Profile} />
              <ProtectedRoute exact path="/auth" component={Auth} />
              <Route path="*" component={Homepage} />
            </Switch>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  );
};

export {
  Component as App,
  // Container as App,
  Component as AppComponent,
};
