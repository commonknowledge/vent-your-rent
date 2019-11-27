/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { colorDarkBlack, equalTopAndBottomMargin, colorWhite } from "../styles";

type RuleProps = {
  secondary?: boolean;
};

const Rule: React.FC<RuleProps> = ({ secondary }) => (
  <div>
    <hr
      css={css`
        height: 2px;
        background: ${!secondary ? colorDarkBlack : colorWhite};
        border: 0;

        ${equalTopAndBottomMargin(30)}
      `}
    />
  </div>
);

export default Rule;
