/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { fontColorBlack } from "../styles";
import gql from "graphql-tag";
import { VentCard } from './__graphql__/VentCard';

const horizontalVentContainer = () => {
  return "flex: 0 0 auto;";
};

const ventContainerCSS = css`
    padding-top: 20px;
    padding-bottom: 20px;
    width: 50%;
    max-width: 200px;
    ${horizontalVentContainer()}
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

const MEDIA_URL = (process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : "")

function Vent({ firstName, image, caption, geo }: VentCard) {
  const wordCount = caption.split(" ").length

  return (
    <div css={ventContainerCSS}>
      <div css={css`
        margin-top: 10px;
        margin-right: 21px;
      `}>
        {image && <div css={css`
        width: 100%;
        height: 150px;
        background-image: url(${MEDIA_URL + image});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        background-color: #FAFAFA;
        border-radius: 3px;
        overflow: hidden;
      `} />}
        <div css={ventText}
          style={{
            fontSize: !image && wordCount <= 10 ? 36 : !image && wordCount <= 18 ? 24 :
              !image && wordCount <= 26 ? 20 :
                !image && wordCount <= 36 ? 18 :
                  !image && wordCount <= 48 ? 14 :
                    16
          }}>{caption}</div>
        <div css={ventDetailsCSS}>
          <div>{firstName}</div>
          {geo && <div css={css`opacity: 0.5;`}>{geo.parliamentaryConstituency}</div>}
        </div>
      </div>
    </div >
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