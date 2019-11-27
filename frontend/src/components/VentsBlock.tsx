/** @jsx jsx */
import { useQuery } from "@apollo/react-hooks";
import { css, jsx } from "@emotion/core";
import gql from "graphql-tag";
import { useState } from "react";

import { colorBlack, colorWhite, fontColorDarkBlack } from "../styles";
import Button from "./Button";
import Vent from "./Vent";
import { VentsQuery } from "./__graphql__/VentsQuery";

type VentsBlockProps = {
  title?: string;
  numberOfVents: number;
  showMore?: boolean;
};

const ventsContainer = css`
  width: 100%;
  div:last-child {
    border-bottom: 0;
  }
`;

const GET_VENTS = gql`
  ${Vent.fragment}

  query VentsQuery($quantity: Int!) {
    vents(quantity: $quantity) {
      ...VentCard
    }
  }
`;

type Vent = {
  firstName: string;
  caption: string;
  postcode: string;
  id: number;
  image: string;
};

export default function VentsBlock({
  title,
  numberOfVents,
  showMore = false
}: VentsBlockProps) {
  const [quantity, setQuantity] = useState(numberOfVents);
  const { loading, data } = useQuery<VentsQuery>(GET_VENTS, {
    variables: { quantity }
  });
  const loadMore = () => setQuantity(q => q + 3);

  return (
    <div
      css={css`
        background-color: ${colorWhite}
        padding-top: 30px;
        padding-bottom: 30px;
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
        {data && data.vents.map(vent => <Vent key={vent.id} {...vent} />)}
      </div>
      {showMore && (
        <Button
          additionalCSS={css`
            background: ${colorBlack};
          `}
          variant="outline"
          onMouseDown={loadMore}
          disabled={loading}
        >
          {loading ? "⏳" : "Read More Rent Vents"}
        </Button>
      )}
    </div>
  );
}
