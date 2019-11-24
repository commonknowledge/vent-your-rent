/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import Emoji from "a11y-react-emoji";
import {
  marginsCss,
  smallSpacing,
  fontColorOrange,
  fontColorBlack
} from "../styles";

const upperCase = css`
  text-transform: uppercase;
`;

const logoCSS = css`
  font-family: Rubik;
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 19px;
  ${fontColorBlack}
  ${upperCase}
`;

const shareCSS = css`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  ${fontColorOrange}

  ${upperCase}
`;

export default function PageHeader() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: ${smallSpacing};
        ${marginsCss}
      `}
    >
      <div css={logoCSS}>#ventyourrent</div>
      <div css={shareCSS}>
        <Emoji symbol="📣" label="trumpet" />
        <span
          css={css`
            margin-left: 5px;
          `}
        >
          Share
        </span>
      </div>
    </div>
  );
}
