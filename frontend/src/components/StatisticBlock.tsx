/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { FunctionComponent } from "react";
import { fontSizeSmall, fontColorBlack, paddingCss } from "../styles";

type StatisticBlockProps = {
  areaName: string;
  areaStatistic: number;
  graphColour?: "red" | "orange";
  nationalAverageStatistic?: number;
  render: JSX.Element;
};

const StatisticBlock: FunctionComponent<StatisticBlockProps> = ({ render }) => (
  <div
    css={css`
      ${fontSizeSmall}
      ${fontColorBlack}
      ${paddingCss}
    `}
  >
    <p>{render}</p>
  </div>
);

export default StatisticBlock;
