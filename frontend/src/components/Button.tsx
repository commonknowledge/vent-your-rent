/** @jsx jsx */
import { jsx } from "@emotion/core";

import { FunctionComponent } from "react";

import { css } from "@emotion/core";

type ButtonProps = {
  type?: "primary" | "secondary" | "outline";
};

const Button: FunctionComponent<ButtonProps> = ({ type, children }) => (
  <button
    css={css`
      background: ${type === "secondary" ? " #353535" : "#E04839"};
      border-radius: 6px;

      font-family: "Rubik Mono One", sans-serif;
      font-style: normal;
      font-size: 16px;
      line-height: 19px;
      padding: 13px;

      text-align: center;
      text-transform: uppercase;
      color: #ffffff;
      border: 0;
    `}
  >
    {children}
  </button>
);

export default Button;
