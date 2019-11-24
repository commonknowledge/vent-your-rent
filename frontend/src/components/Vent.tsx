/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { fontColorBlack } from "../styles";

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

  ${fontColorBlack}
`;

const ventImage = css`
  max-width: 150px;
`;

type VentProps = {
  text: string;
  firstName: string;
  city: string;
  imageSrc?: string;
};

export default function Vent({ text, firstName, city, imageSrc }: VentProps) {
  return (
    <div css={ventContainerCSS}>
      {imageSrc && <img css={ventImage} src={imageSrc} alt="" />}
      <div css={ventText}>{text}</div>
      <div css={ventDetailsCSS}>
        <div>{firstName}</div>
        <div>{city}</div>
      </div>
    </div>
  );
}
