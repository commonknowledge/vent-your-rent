/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";

import { Global, css } from "@emotion/core";

import emotionNormalize from "emotion-normalize";

import ResultsPage from "./pages/ResultsPage";

const App: React.FC = () => {
  return (
    <Fragment>
      <Global
        styles={css`
        ${emotionNormalize}
          body {
            background: #f0f0f0;   
            font-family: 'Rubik', sans-serif;
            min-height: 100%;
            margin: 0;
            padding: 0;
          }%;
        `}
      />
      <ResultsPage />
    </Fragment>
  );
};

export default App;
