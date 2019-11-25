/** @jsx jsx */
import { jsx } from "@emotion/core";

import PartnerBlock from "./PartnerBlock";

import GenerationRentLogo from "./logos/generation-rent.svg";

const GenerationRentBlock = () => (
  <PartnerBlock
    logo={GenerationRentLogo}
    name="Generation Rent"
    description="Vent Your Rent is a campaign run by Generation Rent, the national voice of private renters. We campaign for safe, fair and secure homes for all of us renting."
    linkText="Find out more"
    linkHref="https://www.generationrent.org/"
  />
);

export default GenerationRentBlock;
