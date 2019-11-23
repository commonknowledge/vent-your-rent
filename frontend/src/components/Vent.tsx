/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const horizontalVentContainer = () => {
  return "flex: 0 0 auto;";
};

const ventContainerCSS = css`
    margin-top: 10px;
    margin-right 21px;
    padding-top: 20px;
    padding-bottom: 20px;
    max-width: 150px;
    ${horizontalVentContainer()}
  `;

const ventText = css`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
`;

const ventDetailsCSS = css`
  margin-top: 10px;

  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  text-transform: uppercase;

  color: #353535;
`;

const ventImage = css`
  max-width: 150px;
`;

type VentProps = {
  text: string;
  firstName: string;
  city: string;
};

export default function Vent({ text, firstName, city }: VentProps) {
  return (
    <div css={ventContainerCSS}>
      <img css={ventImage} src="https://placeimg.com/640/480/people" alt="" />
      <div css={ventText}>{text}</div>
      <div css={ventDetailsCSS}>
        <div>{firstName}</div>
        <div>{city}</div>
      </div>
    </div>
  );
}
