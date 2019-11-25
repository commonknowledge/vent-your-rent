/** @jsx jsx */
import { jsx, SerializedStyles } from "@emotion/core";

import { FunctionComponent } from "react";

import { css } from "@emotion/core";
import {
  fontColorWhite,
  fontSizeSmall,
  colorBlack,
  colorOrange
} from "../styles";

type buttonStyles = "primary" | "secondary" | "outline";

type ButtonProps = {
  type?: buttonStyles;
  additionalCSS?: SerializedStyles;
  onClick?: () => void;
};

const outlineButton = `
  border: 1px solid #ffffff;
`;

function backgroundFromType(type: buttonStyles) {
  if (type === "outline") {
    return "inherit";
  }

  return type === "secondary" ? colorBlack : colorOrange;
}

const Button: FunctionComponent<ButtonProps> = ({
  type = "primary",
  children,
  additionalCSS,
  onClick
}) => {
  return (
    <button
      css={css`
        background: ${backgroundFromType(type)};
        border-radius: 6px;
        border: 0;
        height: 45px;

        ${type === "outline" ? outlineButton : "border: 0;"}

        ${fontSizeSmall}
        font-weight: 900;

        text-align: center;
        text-transform: uppercase;
        ${fontColorWhite}
        width: 100%;

        ${additionalCSS}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
