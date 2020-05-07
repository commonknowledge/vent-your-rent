import * as React from 'react'
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import { analytics, AnalyticsProvider } from "./data/analytics";
import GraphQLProvider from "./data/graphql";
import { Routes2019 } from "./pages/2019/Routes";
import { RoutesMay2020 } from "./pages/May2020/Routes";
import CookieConsentBanner from "./components/CookieConsentBanner";

const history = createBrowserHistory();

// @ts-ignore
analytics.logView(window.location.pathname);

history.listen(l => {
  analytics.logView(l.pathname);
});

const App: React.FC = () => {
  return (
    <AnalyticsProvider value={analytics}>
      <Router history={history}>
        <GraphQLProvider>
          <Switch>>
            <Route path="/old" component={Routes2019} />
            <Route path="/" component={RoutesMay2020} />
          </Switch>
          <CookieConsentBanner onConsent={analytics.initialiseCookies} />
        </GraphQLProvider>
      </Router>
    </AnalyticsProvider>
  );
};

export default App;
