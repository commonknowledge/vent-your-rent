/** @jsx jsx */
import { css, Global, jsx } from "@emotion/core";
import emotionNormalize from "emotion-normalize";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import { analytics, AnalyticsProvider } from "./data/analytics";
import GraphQLProvider from "./data/graphql";
import FirstPage from "./pages/FirstPage";
import ResultsPage from "./pages/ResultsPage";
import ThirdPage from "./pages/ThirdPage";
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
          <Global
            styles={css`
              ${emotionNormalize}
              body {
                background: #f0f0f0;
                font-family: "Rubik", sans-serif;
                min-height: 100%;
                margin: 0;
                padding: 0;
              }

              // Set box-sizing to border-box universally
              // See https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/
              html {
                box-sizing: border-box;
              }

              *,
              *:before,
              *:after {
                box-sizing: inherit;
              }
            `}
          />
          <Switch>
            <Route
              path="/old/welcome-to-the-movement"
              component={ThirdPage}
            />
            <Route path="/old/:postcode" component={ResultsPage} />
            <Route path="/old" component={FirstPage} />
            <Route component={FirstPage} />
          </Switch>
          <CookieConsentBanner onConsent={analytics.initialiseCookies} />
        </GraphQLProvider>
      </Router>
    </AnalyticsProvider>
  );
};

export default App;
