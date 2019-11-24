/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PostcodeSearch from "../components/PostcodeSearch";
import { RouteComponentProps } from "react-router";

const FirstPage: React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        padding-top: 20px;
        color: #000000;
        font-size: 21px;
        line-height: 25px;
        letter-spacing: -0.04em;
        background-color: #ec7b70;
        padding: 20px;
        height: 100vh;
      `}
    >
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
      <div
        css={css`
          margin-top: 20px;
          margin-bottom: 20px;
        `}
      >
        We all deserve a house we can call home, somewhere we can feel safe and
        secure. But for the <strong>one in five</strong> people in the UK
        renting privately, that's not the case.
      </div>
      <div
        css={css`
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
