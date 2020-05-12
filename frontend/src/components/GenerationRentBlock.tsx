/** @jsx jsx */
import { jsx } from "@emotion/core";

import PartnerBlock from "./PartnerBlock";

import GenerationRentLogo from "./logos/generation-rent.svg";

const GenerationRentBlock = () => (
  <PartnerBlock
    logo={GenerationRentLogo}
    name="Generation Rent"
    linkHref="https://www.generationrent.org/"
  />
);

export default GenerationRentBlock;
