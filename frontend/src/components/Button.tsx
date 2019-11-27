/** @jsx jsx */
import { jsx, SerializedStyles } from "@emotion/core";

import {
  FunctionComponent,
  DetailedHTMLProps,
  ButtonHTMLAttributes
} from "react";

import { css } from "@emotion/core";
import {
  fontColorWhite,
  fontSizeSmall,
  colorBlack,
  colorOrange
} from "../styles";

type buttonStyles = "primary" | "secondary" | "outline";

type ButtonProps = {
  variant?: buttonStyles;
  additionalCSS?: SerializedStyles;
};

export const outlineButton = `
  border: 2px solid #ffffff;
`;

function backgroundFromType(variant: buttonStyles) {
  if (variant === "outline") {
    return "inherit";
  }

  return variant === "secondary" ? colorBlack : colorOrange;
}

const Button: FunctionComponent<ButtonProps &
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >> = ({ variant = "primary", children, additionalCSS, ...props }) => {
  return (
    <button
      css={css`
        background: ${backgroundFromType(variant)};
        cursor: pointer;
        border-radius: 6px;
        border: 0;
        height: 45px;

        ${variant === "outline" ? outlineButton : "border: 0;"}

        ${fontSizeSmall}
        font-weight: 900;

        text-align: center;
        text-transform: uppercase;
        ${fontColorWhite}
        width: 100%;

        ${additionalCSS}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
