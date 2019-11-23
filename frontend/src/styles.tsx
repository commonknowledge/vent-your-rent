import { css } from "@emotion/core";

export const colorWhite = "#FFFFFF";
export const colorBlack = "#353535";

export const fontColorBlack = `color: ${colorBlack};`;

export const marginsCss = css`
  margin-right: 20px;
  margin-left: 20px;
`;

export const paddingCss = css`
  padding-right: 20px;
  padding-left: 20px;
`;

export const fontSizeLarge = css`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 38px;
  line-height: 38px;
`;

export const fontSizeSmall = css`
  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
`;

export const boldLink = css`
  ${fontSizeSmall}
  ${fontColorBlack}
  text-decoration: underline;
  text-transform: uppercase;
`;

export const equalTopAndBottomMargin = (spacing: number) => {
  return css`
    margin-top: ${spacing}px;
    margin-bottom: ${spacing}px;
  `;
};

export const equalTopAndBottomPadding = (spacing: number) => {
  return css`
    padding-top: ${spacing}px;
    padding-bottom: ${spacing}px;
  `;
};
