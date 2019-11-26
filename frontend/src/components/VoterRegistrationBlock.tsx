/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import { fontSizeMedium, fontSizeSmall } from "../styles";
import { PageWidth } from "./PageElements";
import Emoji from "a11y-react-emoji";

export default function VoterRegistrationBlock() {
  return (
    <div
      css={css`
        margin: 20px;
      `}
    >
      <PageWidth>
        <div
          css={css`
            ${fontSizeMedium}
            letter-spacing: -0.04em;
            margin-bottom: 10px;
          `}
        >
          <Emoji symbol="🚨🚨🚨" /> The voter registration deadline is
          <strong>tomorrow!</strong>
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
      </PageWidth>
    </div>
  );
}
