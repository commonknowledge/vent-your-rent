/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import gql from "graphql-tag";
import TimeAgo from "react-timeago";

import { fontColorBlack } from "../styles";
import { VentCard } from "./__graphql__/VentCard";
import Emoji from "a11y-react-emoji";

const horizontalVentContainer = () => {
  return "flex: 0 0 auto;";
};

const ventContainerCSS = css`
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
  ${horizontalVentContainer()}
  position: relative;

  @media (min-width: 1024px) {
    width: 50%;
    max-width: 200px;
  }
`;

const ventText = css`
  font-style: normal;
  font-weight: bold;
  line-height: 1.1em;
`;

const ventDetailsCSS = css`
  margin-top: 10px;

  font-style: normal;
  font-weight: bold;
  line-height: 14px;

  ${fontColorBlack}
`;

const MEDIA_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";

function Vent({ firstName, image, caption, geo, dateCreated }: VentCard) {
  const wordCount = caption.split(" ").length;

  return (
    <div css={ventContainerCSS}>
      <div
        css={css`
          margin-top: 10px;
          margin-right: 21px;
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
        <div
          css={ventText}
          style={{
            fontSize:
              !image && wordCount <= 10
                ? 36
                : !image && wordCount <= 18
                ? 24
                : !image && wordCount <= 26
                ? 20
                : !image && wordCount <= 36
                ? 18
                : !image && wordCount <= 48
                ? 14
                : 16
          }}
        >
          {caption} <span style={{ opacity: 0.5 }}>#VentYourRent</span>
        </div>
        <div css={ventDetailsCSS}>
          <div>
            {firstName} <Emoji symbol="✊" />
          </div>
          {geo && (
            <div
              css={css`
                opacity: 0.66;
                margin-top: 5px;
              `}
            >
              {geo.parliamentaryConstituency}
            </div>
          )}
          <div
            css={css`
              margin-top: 5px;
              opacity: 0.33;
            `}
          >
            <TimeAgo
              css={css`
                margin-top: 5px;
              `}
              date={dateCreated}
            />
          </div>
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
