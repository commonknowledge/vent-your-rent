/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import {
  fontSizeMedium,
  fontSizeSmall,
  colorWhite,
  colorDarkBlack,
  fontColorDarkBlack
} from "../styles";
import { PageWidth } from "./PageElements";
import Emoji from "a11y-react-emoji";

type VoterRegistrationBlock = {
  includeLongerCopy?: boolean;
  inline?: boolean;
};

const VoterRegistrationBlock: React.FC<VoterRegistrationBlock> = ({
  includeLongerCopy,
  inline = false
}) => {
  return (
    <div
      css={css`
        ${!inline
          ? `background: ${colorWhite};
        padding: 20px;`
          : ""}
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
          <p>
            <Emoji symbol="🚨🚨🚨" /> The voter registration deadline is{" "}
            <strong>today!</strong>
          </p>
          {includeLongerCopy && (
            <p
              css={css`
                ${fontSizeSmall}
                ${fontColorDarkBlack}
              `}
            >
              Your voice is powerful: there are 47 marginal seats where renters
              could cast the deciding vote. This means that renters could
              determine the outcome of this election.
            </p>
          )}
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
};

export default VoterRegistrationBlock;
