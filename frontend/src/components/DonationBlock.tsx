/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Emoji from "a11y-react-emoji";
import Button from "./Button";
import { fontSizeMedium, fontSizeSmall } from "../styles";

export default function DonationBlock() {
  return (
    <div
      css={css`
        margin-bottom: 20px;
      `}
    >
      <div
        css={css`
          ${fontSizeMedium}
          letter-spacing: -0.04em;
        `}
      >
        <Emoji symbol="🙏" /> Help sustain this campaign
      </div>
      <div css={fontSizeSmall}>
        <p>
          We have just a handful of staff but our movement is made up of
          thousands of people like you taking action.
        </p>
        <p>Can you chip in a £1 to help us run more campaigns like this?</p>
      </div>

      <Button
        variant="secondary"
        onClick={() => {
          window.open(
            "https://www.rentermanifesto.org/donate_to_our_general_election_fund",
            "_blank"
          );
        }}
      >
        Donate
      </Button>
    </div>
  );
}
