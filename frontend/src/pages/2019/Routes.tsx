/** @jsx jsx */
import { css, Global, jsx } from "@emotion/core";
import emotionNormalize from "emotion-normalize";
import { Switch, Route } from 'react-router-dom';
import FirstPage from "./FirstPage";
import ResultsPage from "./ResultsPage";
import ThirdPage from "./ThirdPage";
import { Fragment } from "react";

export const Routes2019 = () => {
  return (
    <Fragment>
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
      </Switch>
    </Fragment>
  )
}
