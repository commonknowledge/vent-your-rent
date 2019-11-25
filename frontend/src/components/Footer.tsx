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
        <a
          href="https://www.generationrent.org/contact"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </a>
        <a
          href="https://www.generationrent.org/privacy_notice"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy
        </a>
      </div>
      <div>
        Site by <strong>Common Knowledge</strong>
      </div>
    </div>
  );
}
