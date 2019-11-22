/** @jsx jsx */
import { jsx } from "@emotion/core";
import Emoji from "a11y-react-emoji";
import Button from "./Button";

export default function ContactCandidateBlock() {
  return (
    <div>
      <div>
        {" "}
        <Emoji symbol="🚨" /> Raise awareness of this issue by contacting your
        local candidate directly{" "}
      </div>
      <Button>Meet your candidates</Button>
      <Button>Tweet your candidates</Button>
    </div>
  );
}
