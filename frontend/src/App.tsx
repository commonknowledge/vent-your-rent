/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Global, css } from "@emotion/core";
import emotionNormalize from "emotion-normalize";
import ResultsPage from "./pages/ResultsPage";
import GraphQLProvider from "./data/graphql";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import FirstPage from "./pages/FirstPage";
import ThirdPage from "./pages/ThirdPage";

const history = createBrowserHistory();

const App: React.FC = () => {
  return (
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
          <Route exact path="/third" component={ThirdPage} />
          <Route exact path="/:postcode" component={ResultsPage} />
          <Route component={FirstPage} />
        </Switch>
      </GraphQLProvider>
    </Router>
  );
};

export default App;
