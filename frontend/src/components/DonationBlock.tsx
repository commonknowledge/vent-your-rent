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
          Vent Your Rent is a campaign run by Generation Rent, the national
          voice of private renters. We campaign for safe, fair and secure homes
          for all of us renting and work with all parties to make that happen.
        </p>
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
