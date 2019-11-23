import { css } from "@emotion/core";

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

export const colorWhite = "#FFFFFF";

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
