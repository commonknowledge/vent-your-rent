/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PostcodeSearch from "../components/PostcodeSearch";
import { RouteComponentProps } from "react-router";
import { PageWidth } from "../components/PageElements";
import {
  fontSizeExtraLarge,
  fontColorBlack,
  colorOrange,
  fontSizeMedium,
  smallSpacing
} from "../styles";
import GenerationRentBlock from "../components/GenerationRentBlock";
import RenterManifestoBlock from "../components/RenterManifestoBlock";
import Footer from "../components/Footer";
import VoterRegistrationBlock from "../components/VoterRegistrationBlock";
import VentsBlock from "../components/VentsBlock";

const FirstPage: React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <div>
      <VoterRegistrationBlock />
      <div
        css={css`
          display: flex;
          flex-direction: column;

          padding: 20px;
          background: ${colorOrange};
        `}
      >
        <PageWidth>
          <header
            css={css`
              ${fontSizeExtraLarge}
              ${fontColorBlack}
          text-transform: uppercase;
            `}
          >
            Vent Your Rent
          </header>
          <div
            css={css`
              margin-top: 20px;
              margin-bottom: 20px;
              ${fontSizeMedium}
            `}
          >
            We all deserve <strong>somewhere we can call home</strong>, but for
            the one in five people in the UK renting privately, that’s not the
            case.
          </div>
          <div
            css={css`
              ${fontSizeMedium}
              font-weight: bold;
              margin-bottom: ${smallSpacing};
            `}
          >
            What does the renting crisis look like in your area?
          </div>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              margin-bottom: ${smallSpacing};
            `}
          >
            <PostcodeSearch
              label="Enter your postcode"
              onSubmit={postcode => {
                history.push(`/${postcode}`);
              }}
            />
          </div>
        </PageWidth>
      </div>
      <div
        css={css`
          padding: 20px;
        `}
      >
        <PageWidth>
          <VentsBlock numberOfVents={3} showMore />
          <GenerationRentBlock />
          <RenterManifestoBlock />
          <Footer />
        </PageWidth>
      </div>
    </div>
  );
};

export default FirstPage;
