/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { colorDarkBlack, equalTopAndBottomMargin } from "../styles";

type RuleProps = {};

const Rule: React.FC<RuleProps> = () => (
  <div>
    <hr
      css={css`
        height: 2px;
        background: ${colorDarkBlack};
        border: 0;

        ${equalTopAndBottomMargin(30)}
      `}
    />
  </div>
);

export default Rule;
