/** @jsx jsx */
import { jsx } from "@emotion/core";
import Button from "./Button";

function TakeActionBlock() {
  return (
    <div>
      <h2>Take action</h2>
      <p>
        We’re in a renting crisis, but no one is talking about it. We want to
        show all parties at this election that renters are a political force.
      </p>
      <p>Read the full manifesto</p>
      <form>
        <div>
          <input placeholder="First name*" />
          <input placeholder="Last name*" />
          <input placeholder="Email*" />
        </div>
        <div>
          <p>Tell everyone about your worst rental experience:</p>
          <textarea placeholder="Your story here" />
        </div>
        <div>
          <Button>Take Photo</Button>
          <Button>Upload Photo</Button>
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
