import { css } from "@emotion/core";

export const colorWhite = "#FFFFFF";
export const colorBlack = "#353535";
export const colorDarkBlack = "#000000";
export const colorRed = "#E04839";
export const colorOrange = "#FF974B";

export const fontColorBlack = `color: ${colorBlack};`;
export const fontColorWhite = `color ${colorWhite};`;
export const fontColorOrange = `color ${colorOrange};`;
export const fontColorDarkBlack = `color: ${colorDarkBlack};`;

export const smallSpacing = "15px";

export const marginsCss = css`
  margin-right: 20px;
  margin-left: 20px;
`;

export const paddingCss = css`
  padding-right: 20px;
  padding-left: 20px;
`;

export const fontSizeExtraLarge = css`
  font-style: normal;
  font-weight: 900;
  font-size: 90px;
  line-height: 70px;
`;

export const fontSizeLarge = css`
  font-style: normal;
  font-weight: 500;
  font-size: 38px;
  line-height: 38px;
`;

export const fontSizeMedium = css`
  font-style: normal;
  font-weight: normal;
  font-size: 21px;
  line-height: 25px;
  letter-spacing: -0.04em;
`;

export const fontSizeSmall = css`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
`;

export const fontSizeExtraSmall = css`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
`;

export const fontSizeExtraExtraSmall = css`
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 12px;
`;

export const boldLink = css`
  ${fontSizeSmall}
  ${fontColorBlack}
  font-weight: bold;
  text-decoration: underline;
  text-transform: uppercase;
`;

export const buttonTextSecondary = css`
  ${fontSizeSmall}
  ${fontColorWhite}
  font-weight: 900;
  text-align: center;
  text-transform: uppercase;
`;

export const buttonSecondary = css`
  ${buttonTextSecondary}

  background: ${colorBlack};
  border-radius: 6px;
  border: 0;
  padding-bottom: 13px;
  padding-top: 13px;
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
