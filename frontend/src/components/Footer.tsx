/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { fontSizeExtraSmall, fontColorDarkBlack } from "../styles";

export default function Footer() {
  return (
    <div
      css={css`
        ${fontSizeExtraSmall}
        ${fontColorDarkBlack}
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-weight: 500;

          a {
            text-decoration: none;
            color: inherit;
          }
        `}
      >
        <a href="#">Contact</a>
        <a href="#">Privacy</a>
        <a href="#">Disclaimer</a>
      </div>
      <div>
        Site by <strong>Common Knowledge</strong>
      </div>
    </div>
  );
}
