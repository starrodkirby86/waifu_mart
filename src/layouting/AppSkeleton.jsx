import React from 'react';
import Home from './Home';
import PurchasePage from './PurchasePage';
import { Container, Header } from 'semantic-ui-react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const AppSkeleton = () => (
  <Container>
    <Header as="h1">
      Waifu Mart
      <Header.Subheader>
        Shop for all-natural, organic, free-range 100% non-GMO waifus. :)
      </Header.Subheader>
    </Header>
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={PurchasePage} />
      </Switch>
    </Router>
  </Container>
);

export default AppSkeleton;