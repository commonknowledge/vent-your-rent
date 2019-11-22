/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import faker from "faker";
import Button from "./Button";

type VentsBlockProps = {
  title?: string;
  numberOfVents: number;
  showMore?: boolean;
};

const horizontalVentContainer = () => {
  return "flex: 0 0 auto;";
};

const ventContainerCSS = css`
  margin-top: 10px;
  margin-right 21px;
  padding-top: 20px;
  padding-bottom: 20px;
  max-width: 150px;
  ${horizontalVentContainer()}
`;

const ventText = css`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
`;

const ventDetailsCSS = css`
  margin-top: 10px;

  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  text-transform: uppercase;

  color: #353535;
`;

const ventImage = css`
  max-width: 150px;
`;

function ventsDummy(amount: number) {
  const vents: Array<JSX.Element> = [];
  for (let ventsTotal = 0; ventsTotal < amount; ventsTotal++) {
    vents.push(
      <div key={ventsTotal} css={ventContainerCSS}>
        <div css={ventText}>{faker.lorem.sentence()}</div>
        <div css={ventDetailsCSS}>
          <div>{faker.name.firstName()}</div>
          <div>{faker.address.city()}</div>
        </div>
      </div>
    );
  }

  for (let ventsTotal = 0; ventsTotal < amount; ventsTotal++) {
    vents.push(
      <div key={`${ventsTotal}-image`} css={ventContainerCSS}>
        <img css={ventImage} src="https://placeimg.com/640/480/people" alt="" />
        <div css={ventDetailsCSS}>
          <div>{faker.name.firstName()}</div>
          <div>{faker.address.city()}</div>
        </div>
      </div>
    );
  }

  return vents;
}

const ventsContainer = () => css`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
`;

export default function VentsBlock({
  title,
  numberOfVents,
  showMore = false
}: VentsBlockProps) {
  return (
    <div>
      {title && <h3>{title}</h3>}
      <div css={ventsContainer}>{ventsDummy(numberOfVents)}</div>
      {showMore && <Button type="outline">Load More</Button>}
    </div>
  );
}
