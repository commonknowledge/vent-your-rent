/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const upperCase = css`
  text-transform: uppercase;
`;

export default function PageHeader() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      `}
    >
      <div css={upperCase}>#ventyourrent</div>
      <div css={upperCase}>
        <span role="img" aria-label="trumpet">
          📣
        </span>{" "}
        Share
      </div>
    </div>
  );
}
