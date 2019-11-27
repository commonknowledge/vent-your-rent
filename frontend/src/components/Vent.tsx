/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import gql from "graphql-tag";
import {
  fontColorBlack,
  fontColorDarkBlack,
  fontSizeExtraSmall,
  fontSizeSmall,
  fontColorOrange
} from "../styles";
import { VentCard } from "./__graphql__/VentCard";

import Truncate from "react-truncate";
import { useState } from "react";

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

const MEDIA_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";

type VentProps = {};

function Vent({ firstName, image, caption, geo }: VentCard & VentProps) {
  const wordCount = caption.split(" ").length;

  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);

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
        <div css={ventText}>
          <Truncate
            lines={!expanded && 5}
            ellipsis="..."
            onTruncate={isTruncated => {
              isTruncated !== truncated && setTruncated(isTruncated);
            }}
          >
            {caption}
          </Truncate>
        </div>
        <div
          css={css`
            margin-top: 10px;
            ${fontSizeExtraSmall}
            ${fontColorBlack}
            text-transform: uppercase;
            display: flex;
            justify-content: space-between;
          `}
        >
          <div>
            <div
              css={css`
                font-weight: bold;
              `}
            >
              {firstName}
            </div>
            {geo && <div>{geo.parliamentaryConstituency}</div>}
          </div>
          {truncated === true && (
            <a
              css={css`
                ${fontColorOrange}
              `}
              onClick={() => setExpanded(!expanded)}
            >
              Read More
            </a>
          )}
          {truncated === false && expanded === true && (
            <a
              css={css`
                ${fontColorOrange}
              `}
              onClick={() => setExpanded(!expanded)}
            >
              Read Less
            </a>
          )}
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
