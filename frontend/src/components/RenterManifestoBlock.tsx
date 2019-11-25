/** @jsx jsx */
import { jsx } from "@emotion/core";

import PartnerBlock from "./PartnerBlock";

import RenterManifestoLogo from "./logos/renter-manifesto.svg";

const RenterManifestoBlock = () => (
  <PartnerBlock
    name="Renter Manifesto"
    logo={RenterManifestoLogo}
    description="Together with London Renters Union, ACORN, Tenants Union UK, Renters’ Rights London and the New Economics Foundation, we have written a Renter Manifesto."
    linkText="Read the full manifesto"
    linkHref="https://www.rentermanifesto.org/read_the_manifesto_full"
  />
);

export default RenterManifestoBlock;
