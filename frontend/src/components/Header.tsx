/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const Header = () => (
  <header
    css={css`
      font-family: "Rubik Mono One", sans-serif;
      font-style: normal;
      font-weight: 900;
      font-size: 5rem;
      line-height: 78px;
      text-transform: uppercase;
      text-align: center;
      color: #353535;
    `}
  >
    Vent Your Rent
  </header>
);

export default Header;
