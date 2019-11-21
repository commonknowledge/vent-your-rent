/** @jsx jsx */
import { jsx } from "@emotion/core";

import { Global, css } from "@emotion/core";

import emotionNormalize from "emotion-normalize";
import Button from "./Button";
import Header from "./Header";
import TextInput from "./TextInput";

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
      <div
        css={css`
          display: flex;
          flex-direction: column;
          padding-top: 20px;
          color: #000000;
          font-size: 21px;
          line-height: 25px;
          letter-spacing: -0.04em;
          background-color: #ec7b70;
          padding: 20px;
        `}
      >
        <Header />
        <div
          css={css`
            margin-top: 20px;
            margin-bottom: 20px;
          `}
        >
          We all deserve a house we can call home, somewhere we can feel safe
          and secure. But for the <strong>one in five</strong> people in the UK
          renting privately, that's not the case.
        </div>
        <div
          css={css`
            font-weight: bold;
            margin-bottom: 15px;
          `}
        >
          What does the renting crisis look like in your area?
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
          `}
        >
          <TextInput />
          <Button type="secondary">Search</Button>
        </div>
      </div>
    </div>
  );
};

export default App;
