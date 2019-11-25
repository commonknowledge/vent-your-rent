/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Emoji from "a11y-react-emoji";
import Button from "./Button";
import { fontSizeMedium, fontSizeSmall } from "../styles";

export default function VoterRegistrationBlock() {
  return (
    <div
      css={css`
        margin: 20px;
      `}
    >
      <div
        css={css`
          ${fontSizeMedium}
          letter-spacing: -0.04em;
          margin-bottom: 10px;
        `}
      >
        🚨🚨🚨 The voter registration deadline is <strong>tomorrow!</strong>
      </div>
      <div css={fontSizeSmall}>
        <a
          href="https://www.gov.uk/register-to-vote"
          css={css`
            text-decoration-line: underline;
            text-transform: uppercase;
            font-weight: bold;
            color: inherit;
          `}
          target="_blank"
          rel="noopener noreferrer"
        >
          Register To Vote Now
        </a>
      </div>
    </div>
  );
}
