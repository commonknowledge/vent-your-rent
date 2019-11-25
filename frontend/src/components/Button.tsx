/** @jsx jsx */
import { jsx } from "@emotion/core";

import { FunctionComponent, DetailedHTMLProps, ButtonHTMLAttributes } from "react";

import { css } from "@emotion/core";
import { fontColorWhite } from "../styles";

type buttonStyles = "primary" | "secondary" | "outline";

type ButtonProps = {
  variant?: buttonStyles;
}

export const outlineButton = `
  border: 2px solid #ffffff;
`;

function backgroundFromType(variant: buttonStyles) {
  if (variant === "outline") {
    return "inherit";
  }

  return variant === "secondary" ? " #353535" : "#FF974B;";
}

const Button: FunctionComponent<ButtonProps & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({
  variant = "primary",
  children,
  ...props
}) => (
    <button
      css={css`
      background: ${backgroundFromType(variant)};
      border-radius: 6px;

      ${variant === "outline" ? outlineButton : "border: 0;"}

      font-family: "Rubik Mono One", sans-serif;
      font-style: normal;
      font-size: 16px;
      line-height: 19px;
      padding: 13px;

      text-align: center;
      text-transform: uppercase;
      ${fontColorWhite}
      width: 100%;
    `}
      {...props}
    >
      {children}
    </button>
  );

export default Button;
