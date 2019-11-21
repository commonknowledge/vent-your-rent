/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const Header = () => (
  <header
    css={css`
      font-family: "Rubik Mono One", sans-serif;
      font-style: normal;
      font-weight: 900;
      font-size: 5rem;
      line-height: 65px;
      text-transform: uppercase;
      color: #353535;
    `}
  >
    Vent Your Rent
  </header>
);

export default Header;
