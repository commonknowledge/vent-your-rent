/** @jsx jsx */
import { jsx } from "@emotion/core";

import Emoji from "a11y-react-emoji";

import Page from "../components/Page";
import ShareBar from "../components/ShareBar";
import VentsBlock from "../components/VentsBlock";
import ContactCandidateBlock from "../components/ContactCandidateBlock";
import DonationBlock from "../components/DonationBlock";
import GenerationRentBlock from "../components/GenerationRentBlock";
import RenterManifestoBlock from "../components/RenterManifestoBlock";

const ThirdPage = () => (
  <Page>
    <h1>Welcome to the movement!</h1>
    <h2>
      Share this with your friends (and landlord <Emoji symbol="😘" />
    </h2>
    <ShareBar />
    <VentsBlock numberOfVents={14} showMore={true} />
    <div>
      <h2>Still mad?</h2>
      <ContactCandidateBlock />
      <DonationBlock />
      <GenerationRentBlock />
      <RenterManifestoBlock />
    </div>
  </Page>
);

export default ThirdPage;
