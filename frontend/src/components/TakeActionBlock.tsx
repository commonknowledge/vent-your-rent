/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Button from "./Button";

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

  /* identical to box height */
  text-decoration-line: underline;
  text-transform: uppercase;
`;

const inputFieldCss = css`
  background: #ffffff;
  border-radius: 6px;
  margin-bottom: 15px;
  height: 45px;
  width: 100%;
  padding: 10px;

  // TODO Add this to everything
  box-sizing: border-box;
`;

const textAreaCss = css`
  background: #ffffff;
  border-radius: 6px;
  width: 100%;

  // TODO Add this to everything
  box-sizing: border-box;
  height: 150px;
  margin-bottom: 15px;
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
      `}
    >
      <h2 css={h2CSS}>Take action</h2>
      <p>
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
              margin-bottom: 15px;
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
          <p>
            By checking this box, you agree that organisations can email or
            message you occasionally about their campaigns and other work. If
            you decide later that you don’t want to be contacted, [contact
            option] to unsubscribe.
          </p>
        </div>
        <Button>Add Your Voice</Button>
      </form>
    </div>
  );
}

export default TakeActionBlock;
