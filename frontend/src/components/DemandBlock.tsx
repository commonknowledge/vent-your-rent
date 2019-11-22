/** @jsx jsx */
import { jsx } from "@emotion/core";

type DemandBlockProps = {
  demand: string;
};

export default function DemandBlock({ demand }: DemandBlockProps) {
  return (
    <div>
      <div>
        <span role="img" aria-label="fist">
          ✊
        </span>{" "}
        {demand}
      </div>
      <div>Read the full manifesto</div>
    </div>
  );
}
