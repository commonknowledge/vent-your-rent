/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Emoji from "a11y-react-emoji";
import {
  boldLink,
  colorWhite,
  equalTopAndBottomMargin,
  equalTopAndBottomPadding,
  fontSizeLarge,
  paddingCss,
  smallSpacing
} from "../styles";

type DemandBlockProps = {
  demand: string;
};

const demandContainerCss = css`
  background: ${colorWhite};
  ${equalTopAndBottomPadding(20)}
  ${equalTopAndBottomMargin(30)}
  ${paddingCss}
`;

export default function DemandBlock({ demand }: DemandBlockProps) {
  return (
    <div css={demandContainerCss}>
      <div css={fontSizeLarge}>
        <Emoji symbol="✊" label="fist" />
        {demand}
      </div>
      <div
        css={css`
          margin-top: ${smallSpacing};
        `}
      >
        <a href="#" css={boldLink}>
          Read the full manifesto
        </a>
      </div>
    </div>
  );
}
