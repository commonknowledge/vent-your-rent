/** @jsx jsx */
import { jsx } from "@emotion/core";
import Emoji from "a11y-react-emoji";
import Button from "./Button";

export default function DonationBlock() {
  return (
    <div>
      <div>
        <Emoji symbol="🙏" /> Help sustain this campaign
      </div>
      <Button>Donate></Button>
    </div>
  );
}
