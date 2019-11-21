/** @jsx jsx */
import { jsx } from "@emotion/core";

import { Global, css } from "@emotion/core";

import emotionNormalize from "emotion-normalize";

import FirstPage from "./pages/FirstPage";

const App: React.FC = () => {
  return (
    <div>
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
      <FirstPage />
    </div>
  );
};

export default App;
