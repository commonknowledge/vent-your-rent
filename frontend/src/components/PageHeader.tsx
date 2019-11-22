/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import Emoji from "a11y-react-emoji";

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
        <Emoji symbol="📣" label="trumpet" />
        Share
      </div>
    </div>
  );
}
