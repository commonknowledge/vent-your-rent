/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Emoji from "a11y-react-emoji";
import Button from "./Button";
import { smallSpacing, fontSizeMedium, fontColorDarkBlack } from "../styles";

export default function ContactCandidateBlock() {
  return (
    <div
      css={css`
        // TODO: Make this \${smallSpacing} * 2
        margin-bottom: 30px;
      `}
    >
      <div
        css={css`
          ${fontSizeMedium}
          // TODO: Add this to fontSizeMedium in general
        letter-spacing: -0.04em;

          ${fontColorDarkBlack}
          margin-bottom: ${smallSpacing};
        `}
      >
        <Emoji symbol="🚨" /> Raise awareness of this issue by contacting your
        local candidate directly
      </div>
      <Button
        additionalCSS={css`
          margin-bottom: ${smallSpacing};
        `}
        type="secondary"
        onClick={() => {
          window.open(
            "https://docs.google.com/forms/d/e/1FAIpQLSdDkCjgIDaY4Bt25LqKPMWMxsa4EYcmd84iCqG21DvgFG5_Ig/viewform",
            "_blank"
          );
        }}
      >
        Meet your candidates
      </Button>
      <Button
        type="secondary"
        onClick={() => {
          window.open(
            "https://generationrent.eaction.online/rentermanifesto2019",
            "_blank"
          );
        }}
      >
        Email your candidates
      </Button>
    </div>
  );
}
