/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { fontColorBlack } from "../styles";
import gql from "graphql-tag";
import { VentCard } from './__graphql__/VentCard';

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

  ${fontColorBlack}
`;

const ventImage = css`
  max-width: 150px;
`;

function Vent({ firstName, image, caption, geo }: VentCard) {
  return (
    <div css={ventContainerCSS}>
      {image && <img css={ventImage} src={image} alt="" />}
      <div css={ventText}>{caption}</div>
      <div css={ventDetailsCSS}>
        <div>{firstName}</div>
        {geo && <div>{geo.parliamentaryConstituency}</div>}
      </div>
    </div>
  );
}

Vent.fragment = gql`
  fragment VentCard on VentType {
    id
    firstName
    image
    caption
    geo {
      parliamentaryConstituency
    }
  }
`

export default Vent