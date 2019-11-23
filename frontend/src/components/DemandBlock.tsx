/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import Emoji from "a11y-react-emoji";
import {
  fontSizeLarge,
  colorWhite,
  equalTopAndBottomPadding,
  equalTopAndBottomMargin,
  fontSizeSmall,
  boldLink
} from "../styles";

type DemandBlockProps = {
  demand: string;
};

const demandContainerCss = css`
  background: ${colorWhite};
  ${equalTopAndBottomPadding(20)}
  ${equalTopAndBottomMargin(30)}
`;

const demandCss = css`
  ${fontSizeLarge}
`;

export default function DemandBlock({ demand }: DemandBlockProps) {
  return (
    <div css={demandContainerCss}>
      <div css={demandCss}>
        <Emoji symbol="✊" label="fist" />
        {demand}
      </div>
      <div
        css={css`
          margin-top: 15px;
        `}
      >
        <a href="#" css={boldLink}>
          Read the full manifesto
        </a>
      </div>
    </div>
  );
}
