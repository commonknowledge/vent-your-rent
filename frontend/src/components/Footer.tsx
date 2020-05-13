/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { fontSizeExtraSmall, fontColorDarkBlack } from "../styles";

export default function Footer() {
  return (
    <div
      css={css`
        ${fontSizeExtraSmall}
        ${fontColorDarkBlack}

        a {
          text-decoration: none;
          color: inherit;
          margin-right: 10px;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          margin-bottom: 10px;
          font-weight: 500;
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
        Site&nbsp;by&nbsp;<strong>
          <a
            href="https://commonknowledge.coop"
            target="_blank"
            rel="noopener noreferrer"
          >
            Common Knowledge
          </a>
        </strong>
      </div>
    </div>
  );
}
