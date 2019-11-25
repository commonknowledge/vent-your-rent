/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Global, css } from "@emotion/core";
import emotionNormalize from "emotion-normalize";
import ResultsPage from "./pages/ResultsPage";
import GraphQLProvider from "./data/graphql";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory, History } from 'history'
import { AnalyticsProvider, analytics } from './data/analytics'
import FirstPage from "./pages/FirstPage";
import ThirdPage from "./pages/ThirdPage";

const history = createBrowserHistory()

// @ts-ignore
analytics.logView(window.location.pathname)

history.listen(l => {
  analytics.logView(l.pathname)
})

const App: React.FC = () => {
  return (
    <AnalyticsProvider value={analytics} >
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
            <Route exact path="/welcome-to-the-movement" component={ThirdPage} />
            <Route exact path="/:postcode" component={ResultsPage} />
            <Route component={FirstPage} />
          </Switch>
        </GraphQLProvider>
      </Router>
    </AnalyticsProvider >
  );
};

export default App;
