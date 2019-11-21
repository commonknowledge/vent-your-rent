/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const TextInput = () => (
  <input
    css={css`
      height: 30px;
      background: #ffffff;
      border-radius: 6px;
      padding: 10px;
      font-size: 21px;
      line-height: 25px;
      margin-bottom: 15px;
    `}
  />
);

export default TextInput;
