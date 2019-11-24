/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import faker from "faker";
import Button from "./Button";
import Vent from "./Vent";
import { paddingCss, colorWhite, fontColorDarkBlack } from "../styles";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

type VentsBlockProps = {
  title?: string;
  numberOfVents: number;
  showMore?: boolean;
};

const ventsContainer = css`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
`;

const GET_VENTS = gql`
  query {
    vents {
      id
      firstName
      image
      postcode
      caption
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
  const { loading, error, data } = useQuery(GET_VENTS);

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
        {!loading &&
          data.vents.map((vent: Vent) => (
            <Vent
              firstName={vent.firstName}
              text={vent.caption}
              city={vent.postcode}
              key={vent.id}
              imageSrc={vent.image}
            />
          ))}
      </div>
      {showMore && <Button type="outline">Load More</Button>}
    </div>
  );
}
