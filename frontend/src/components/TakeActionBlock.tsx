/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Button from "./Button";
import { paddingCss, smallSpacing } from "../styles";

const h2CSS = css`
  font-style: normal;
  font-weight: 500;
  font-size: 38px;
  line-height: 38px;
  letter-spacing: -0.03em;
  color: #ffffff;
  margin: 0;
`;

const readTheManifestoLinkCss = css`
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;

  text-decoration-line: underline;
  text-transform: uppercase;
`;

const inputFieldCss = css`
  background: #ffffff;
  border-radius: 6px;
  margin-bottom: ${smallSpacing};
  height: 45px;
  width: 100%;
  padding: 10px;
`;

const textAreaCss = css`
  background: #ffffff;
  border-radius: 6px;
  width: 100%;
  height: 150px;
  margin-bottom: ${smallSpacing};
`;

function TakeActionBlock() {
  return (
    <div
      css={css`
        background: #353535;
        color: #ffffff;
        padding-top: 30px;
        padding-bottom: 30px;
        font-size: 21px;
        line-height: 25px;
        letter-spacing: -0.04em;
        ${paddingCss}
      `}
    >
      <h2 css={h2CSS}>Take action</h2>
      <p
        css={css`
          font-family: Rubik;
          font-style: normal;
          font-weight: normal;
          font-size: 21px;
          line-height: 25px;
          letter-spacing: -0.04em;

          /* White */
          color: #ffffff;
        `}
      >
        We’re in a renting crisis, but no one is talking about it. We want to
        show all parties at this election that renters are a political force.
      </p>
      <p css={readTheManifestoLinkCss}>
        <a
          href="#"
          css={css`
            color: inherit;
          `}
        >
          Read the full manifesto
        </a>
      </p>
      <form>
        <div>
          <input placeholder="First name*" css={inputFieldCss} />
          <input placeholder="Last name*" css={inputFieldCss} />
          <input placeholder="Email*" css={inputFieldCss} />
        </div>
        <div>
          <p>Share your worst rental experience</p>
          <textarea placeholder="Your story here" css={textAreaCss} />
        </div>
        <div
          css={css`
            button {
              margin-bottom: ${smallSpacing};
              font-style: normal;
              font-weight: 900;
              font-size: 16px;
              line-height: 19px;
            }
          `}
        >
          <Button type="outline">Take Photo</Button>
          <Button type="outline">Upload Photo</Button>
        </div>
        <div>
          <input type="checkbox" />
          <label>Keep me updated</label>
          <p
            css={css`
              font-style: normal;
              font-weight: normal;
              font-size: 14px;
              line-height: 17px;
            `}
          >
            By checking this box, you agree that Generation Rent can email you
            occasionally about campaigns. If you decide later that you don’t
            want to be contacted, then click here to unsubscribe.
          </p>
        </div>
        <Button>Add Your Voice</Button>
      </form>
    </div>
  );
}

export default TakeActionBlock;
