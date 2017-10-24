/* @flow */

import React from 'react';
import type { Element } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import _ from 'lodash';

import config from '../../config';
import routes from '../../routes';
// Import your global styles here
import '../../theme/normalize.css';
import './styles.css';

const App = (): Element<'div'> => {
  // Use it when sub routes are added to any route it'll work
  const routeWithSubRoutes = (route): Element<typeof Route> => (
    <Route
      key={_.uniqueId()}
      exact={route.exact || false}
      path={route.path}
      render={props => (
        // Pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes || null} />
      )}
    />
  );

  return (
    <div>
      <Helmet {...config.app} />
      <header>
        <Link to="/"><img src="/images/logo.png" alt="Holiday Ice Rink" className="logo" /></Link>
        <img src="/images/safeway.png" alt="Safeway" className="sponsor" />
        <div className="production">
          A Willy Bietak Production<br />
          Presented By<br />
          <img src="/images/alaska-airlines.png" alt="Alaska Airlines" className="img-alaska-airlines" />
        </div>
      </header>
      <div id="banner">
        <h2>Skate-O-Meter</h2>
      </div>
      <Switch>
        {routes.map(route => routeWithSubRoutes(route))}
      </Switch>
    </div>
  );
};

export default App;
