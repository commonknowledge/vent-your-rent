/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import gql from "graphql-tag";
import TimeAgo from "react-timeago";

import { fontColorBlack, colorOrange } from "../styles";
import { VentCard } from "./__graphql__/VentCard";
import Emoji from "a11y-react-emoji";
import { useState, useMemo } from 'react';
import { Link } from "react-router-dom";

const horizontalVentContainer = () => {
  return "flex: 0 0 auto;";
};

const ventContainerCSS = css`
  padding-top: 20px;
  padding-bottom: 20px;
  ${horizontalVentContainer()}
  position: relative;
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
`;

const MEDIA_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";

type VentProps = VentCard & { collapsed?: boolean, collapsedSentenceCount?: number }

function Vent({ id, firstName, image, caption, geo, dateCreated, collapsed = true, collapsedSentenceCount = 1 }: VentProps) {
  const [isCollapsed, setCollapsed] = useState(collapsed)
  const toggleCollapsed = () => setCollapsed(c => !c)
  const sentences = caption.split(/\. |\.\.\./)
  const displayedSentences = sentences.slice(0, isCollapsed ? collapsedSentenceCount : 1000)
  const wordCountOfTotal = caption.split(' ').length
  const wordCountOfInitialSentences = displayedSentences[0].split(' ').length
  const wordCount = collapsed ? wordCountOfInitialSentences : wordCountOfTotal

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
          {displayedSentences.map((sentence, i) => (
            <p key={i} style={{ margin: '12px 0' }}>
              {sentence}
              {i + 1 === sentences.length ? (
                <span style={{ opacity: 0.5 }}>&nbsp;#VentYourRent</span>
              ) : i + 1 === displayedSentences.length && displayedSentences.length < sentences.length ? (
                <span>
                  <span>... </span>
                  <Link to={`/vent/${id}`} css={css`
                    color: ${colorOrange};
                    text-decoration: none;
                  `}>Continue &rarr;</Link>
                </span>
              ) : null}
            </p>
          ))}
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
