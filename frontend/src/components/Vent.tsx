/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import gql from "graphql-tag";
import {
  fontColorBlack,
  fontColorDarkBlack,
  fontSizeExtraSmall,
  fontSizeSmall
} from "../styles";
import { VentCard } from "./__graphql__/VentCard";

const horizontalVentContainer = () => {
  return "flex: 0 0 auto;";
};

const ventContainerCSS = css`
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
  ${horizontalVentContainer()}
  border-bottom: 1px solid black;
`;

const ventText = css`
  ${fontSizeSmall}
  ${fontColorDarkBlack}
`;

const ventDetailsCSS = css`
  margin-top: 10px;
  ${fontSizeExtraSmall}
  ${fontColorBlack}
  text-transform: uppercase;
`;

const MEDIA_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";

type VentProps = {};

function Vent({ firstName, image, caption, geo }: VentCard & VentProps) {
  const wordCount = caption.split(" ").length;

  return (
    <div css={ventContainerCSS}>
      <div
        css={css`
          margin-top: 10px;
        `}
      >
        {image && (
          <div
            css={css`
              width: 100%;
              height: 150px;
              background-image: url(${MEDIA_URL + image});
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center;
              background-color: #fafafa;
              border-radius: 3px;
              overflow: hidden;
              margin-bottom: 6px;
            `}
          />
        )}
        <div css={ventText}>{caption}</div>
        <div css={ventDetailsCSS}>
          <div
            css={css`
              font-weight: bold;
            `}
          >
            {firstName}
          </div>
          {geo && <div>{geo.parliamentaryConstituency}</div>}
        </div>
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
    dateCreated
  }
`;

export default Vent;
