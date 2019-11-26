/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { FunctionComponent } from "react";
import {
  fontSizeMedium,
  fontColorBlack,
  colorOrange,
  colorRed
} from "../styles";

type StatisticBlockProps = {
  areaName: string;
  areaStatistic: number;
  graphColour?: "red" | "orange";
  nationalAverageStatistic: number;
  render: JSX.Element;
};

const barChart = css`
  border-radius: 3px;
  margin-bottom: 6px;
  height: 28px;
`;

const StatisticBlock: FunctionComponent<StatisticBlockProps> = ({
  render,
  areaName,
  areaStatistic,
  nationalAverageStatistic
}) => {
  const more = areaStatistic > nationalAverageStatistic;

  return (
    <div
      css={css`
        ${fontSizeMedium}
        ${fontColorBlack}
      `}
    >
      {render}
      <div
        css={css`
          margin-top: 6px;
        `}
      >
        <div
          css={css`
        ${barChart}
        width: ${
          more ? "100%" : (areaStatistic / nationalAverageStatistic) * 100 + "%"
        };
        background: ${more ? colorRed : colorOrange};
      `}
        ></div>
        <div
          css={css`
        ${barChart}
        width: ${
          !more
            ? "100%"
            : (nationalAverageStatistic / areaStatistic) * 100 + "%"
        };
        background: grey;
      `}
        ></div>
      </div>
    </div>
  );
};
export default StatisticBlock;
