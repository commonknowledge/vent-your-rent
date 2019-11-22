/** @jsx jsx */
import { jsx } from "@emotion/core";
import Button from "./Button";

type VentsBlockProps = {
  title?: string;
  numberOfVents: number;
  showMore?: boolean;
};

function ventsDummy(amount: number) {
  const vents: Array<JSX.Element> = [];
  for (let ventsTotal = 0; ventsTotal < amount; ventsTotal++) {
    vents.push(
      <div key={ventsTotal}>
        <div></div>
        <div>Name</div>
        <div>Location</div>
      </div>
    );
  }

  return vents;
}

export default function VentsBlock({
  title,
  numberOfVents,
  showMore = false
}: VentsBlockProps) {
  return (
    <div>
      {title && <h3>{title}</h3>}
      <div>{ventsDummy(numberOfVents)}</div>
      {showMore && <Button type="outline">Load More</Button>}
    </div>
  );
}
