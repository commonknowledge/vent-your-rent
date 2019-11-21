/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import Button from "../components/Button";
import Header from "../components/Header";
import TextInput from "../components/TextInput";

const FirstPage = () => (
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
      We all deserve a house we can call home, somewhere we can feel safe and
      secure. But for the <strong>one in five</strong> people in the UK renting
      privately, that's not the case.
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
);

export default FirstPage;
