/** @jsx jsx */
import { jsx } from "@emotion/core";
import { css } from "@emotion/core";

export const PageWidth: React.FC = ({ children }) => <div css={css`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
`}>{children}</div>