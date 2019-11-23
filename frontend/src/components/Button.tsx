/** @jsx jsx */
import { jsx } from "@emotion/core";

import { FunctionComponent } from "react";

import { css } from "@emotion/core";

type buttonStyles = "primary" | "secondary" | "outline";

type ButtonProps = {
  type?: buttonStyles;
};

const outlineButton = `
  border: 1px solid #ffffff;
  box-sizing: border-box;
`;

function backgroundFromType(type: buttonStyles) {
  if (type === "outline") {
    return "inherit";
  }

  return type === "secondary" ? " #353535" : "#E04839";
}

const Button: FunctionComponent<ButtonProps> = ({
  type = "primary",
  children
}) => (
  <button
    css={css`
      background: ${backgroundFromType(type)};
      border-radius: 6px;

      ${type === "outline" ? outlineButton : "border: 0;"}

      font-family: "Rubik Mono One", sans-serif;
      font-style: normal;
      font-size: 16px;
      line-height: 19px;
      padding: 13px;

      text-align: center;
      text-transform: uppercase;
      color: #ffffff;
      width: 100%;
    `}
  >
    {children}
  </button>
);

export default Button;
