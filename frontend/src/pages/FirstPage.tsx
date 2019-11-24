/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PostcodeSearch from "../components/PostcodeSearch";
import { RouteComponentProps } from "react-router";
import {
  fontSizeExtraLarge,
  fontColorBlack,
  colorOrange,
  fontSizeMedium
} from "../styles";

const FirstPage: React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;

        background-color: ${colorOrange};
        padding: 20px;
      `}
    >
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
        We all deserve <strong>a house we can call home</strong>, but for the
        one in five people in the UK renting privately, that’s not the case.
      </div>
      <div
        css={css`
          ${fontSizeMedium}
          font-weight: bold;
          margin-bottom: 15px;
        `}
      >
        What does the renting crisis look like in your area?
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
        `}
      >
        <PostcodeSearch
          label="Enter your postcode"
          onSubmit={postcode => {
            console.log(postcode);
            history.push(`/${postcode}`);
          }}
        />
      </div>
    </div>
  );
};

export default FirstPage;
