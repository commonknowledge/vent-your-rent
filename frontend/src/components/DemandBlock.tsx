/** @jsx jsx */
import { jsx } from "@emotion/core";

import Emoji from "a11y-react-emoji";

type DemandBlockProps = {
  demand: string;
};

export default function DemandBlock({ demand }: DemandBlockProps) {
  return (
    <div>
      <div>
        <Emoji symbol="✊" label="fist" />
        {demand}
      </div>
      <div>Read the full manifesto</div>
    </div>
  );
}
