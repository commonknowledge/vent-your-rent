/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import faker from "faker";
import Button from "./Button";
import Vent from "./Vent";
import { paddingCss, colorWhite, fontColorDarkBlack } from "../styles";

type VentsBlockProps = {
  title?: string;
  numberOfVents: number;
  showMore?: boolean;
};

function ventsDummy(amount: number) {
  const vents = [];
  for (let ventsTotal = 0; ventsTotal < amount; ventsTotal++) {
    vents.push({
      text: faker.lorem.sentence(),
      firstName: faker.name.firstName(),
      city: faker.address.city()
    });
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
  const vents = ventsDummy(numberOfVents);
  return (
    <div
      css={css`
        background-color: ${colorWhite}
        padding-top: 30px;
        padding-bottom: 30px;

        ${paddingCss}
      `}
    >
      {title && (
        <h3
          css={css`
            margin: 0px;
            font-style: normal;
            font-weight: bold;
            font-size: 21px;
            line-height: 25px;
            letter-spacing: -0.04em;

            ${fontColorDarkBlack}
          `}
        >
          {title}
        </h3>
      )}
      <div css={ventsContainer}>
        {vents.map(({ firstName, text, city }, index) => (
          <Vent firstName={firstName} text={text} city={city} key={index} />
        ))}
      </div>
      {showMore && <Button type="outline">Load More</Button>}
    </div>
  );
}
