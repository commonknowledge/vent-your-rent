/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Link } from "react-router-dom";
import { fontColorBlack, marginsCss, smallSpacing } from "../styles";
import { PageWidth } from "./PageElements";

const upperCase = css`
  text-transform: uppercase;
`;

const logoCSS = css`
  font-family: Rubik;
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 19px;
  ${upperCase}
`;

export default function PageHeader() {
  return (
    <PageWidth>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-top: ${smallSpacing};
          ${marginsCss}
        `}
      >
        <div css={logoCSS}>
          <Link
            to="/"
            css={css`
              text-decoration: none;
              color: inherit;
            `}
          >
            #ventyourrent
          </Link>
        </div>
      </div>
    </PageWidth>
  );
}
