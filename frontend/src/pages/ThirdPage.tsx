/** @jsx jsx */
import { jsx } from "@emotion/core";

import Emoji from "a11y-react-emoji";

import Page from "../components/Page";
import ShareBar from "../components/ShareBar";
import VentsBlock from "../components/VentsBlock";

const ThirdPage = () => (
  <Page>
    <h1>Welcome to the movement!</h1>
    <h2>
      Share this with your friends (and landlord <Emoji symbol="😘" />
    </h2>
    <ShareBar />
    <VentsBlock numberOfVents={14} showMore={true} />
  </Page>
);

export default ThirdPage;
