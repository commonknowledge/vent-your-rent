/** @jsx jsx */
import { jsx } from "@emotion/core";

import Button from "./Button";

export default function VentPane() {
  return (
    <div>
      <div>
        <h1>Tell everyone about your worst rental experience.</h1>
        <div>X</div>
      </div>
      <div>
        <textarea placeholder="Go on then..." />
        <Button variant="outline">Take Photo</Button>
        <Button variant="outline">Upload Photo</Button>
        <Button>Vent!</Button>
      </div>
    </div>
  );
}
