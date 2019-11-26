/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import Emoji from "a11y-react-emoji";

import Page from "../components/Page";
import ShareBar from "../components/ShareBar";
import VentsBlock from "../components/VentsBlock";
import ContactCandidateBlock from "../components/ContactCandidateBlock";
import DonationBlock from "../components/DonationBlock";
import GenerationRentBlock from "../components/GenerationRentBlock";
import RenterManifestoBlock from "../components/RenterManifestoBlock";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { PageWidth } from "../components/PageElements";
import { marginsCss } from "../styles";
import VoterRegistrationBlock from "../components/VoterRegistrationBlock";
import Rule from "../components/Rule";

const ThirdPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Page>
      <PageWidth>
        <div
          css={css`
            ${marginsCss}
          `}
        >
          <h1>Welcome to the movement!</h1>
          <h2>
            Share this with your friends - and your landlord{" "}
            <Emoji symbol="😘" />
          </h2>
          <ShareBar message="Vent Your Rent" url="https://ventyour.rent" />
          <Rule />
          <VoterRegistrationBlock includeLongerCopy inline />
          <VentsBlock numberOfVents={14} showMore={true} />
          <div>
            <h2>Still mad?</h2>
            <ContactCandidateBlock />
            <DonationBlock />
            <GenerationRentBlock />
            <RenterManifestoBlock />
          </div>
        </div>
      </PageWidth>
    </Page>
  );
};

export default ThirdPage;
