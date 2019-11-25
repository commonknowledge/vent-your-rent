/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Button from "./Button";
import Vent from "./Vent";
import { paddingCss, colorWhite, fontColorDarkBlack } from "../styles";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { VentsQuery } from './__graphql__/VentsQuery';
import { useState } from 'react';

type VentsBlockProps = {
  title?: string;
  numberOfVents: number;
  showMore?: boolean;
};

const ventsContainer = css`
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
`;

const GET_VENTS = gql`
  ${Vent.fragment}

  query VentsQuery ($quantity: Int!) {
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
  const [quantity, setQuantity] = useState(3)
  const { loading, error, data } = useQuery<VentsQuery>(GET_VENTS, { variables: { quantity } });
  const loadMore = () => setQuantity(q => q + 3)

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
        {data && data.vents.map((vent) => (
          <Vent key={vent.id} {...vent} />
        ))}
      </div>
      {showMore && <Button variant="outline" onMouseDown={loadMore} disabled={loading}>{loading ? "⏳" : "Load More"}</Button>}
    </div>
  );
}
