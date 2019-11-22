/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";

import { Global, css } from "@emotion/core";

import emotionNormalize from "emotion-normalize";

// import FirstPage from "./pages/FirstPage";
import ResultsPage from "./pages/ResultsPage";
// import ThirdPage from "./pages/ThirdPage";
// import VentPane from "./components/VentPane";

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
