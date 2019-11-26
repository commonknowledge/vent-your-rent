/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { FunctionComponent } from "react";
import {
  fontSizeMedium,
  fontColorBlack,
  colorOrange,
  colorRed,
  fontSizeSmall,
  smallSpacing,
  equalTopAndBottomMargin,
  fontSizeExtraExtraSmall,
  fontColorWhite
} from "../styles";

type StatisticBlockProps = {
  areaName: string;
  areaStatistic: number;
  graphColour?: "red" | "orange";
  nationalAverageStatistic: number;
  render: JSX.Element;
  hideNationalCaption?: boolean;
};

const barChart = css`
  border-radius: 3px;
  margin-top: 6px;
  height: 20px;
`;

const barChartCaption = css`
  ${fontSizeExtraExtraSmall}
  ${fontColorWhite}
  text-transform: uppercase;
  min-width: 200px;
`;

const positionText = css`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  padding-left: 5px;
  overflow: hidden;
`;

// 95px;

const StatisticBlock: FunctionComponent<StatisticBlockProps> = ({
  render,
  areaName,
  areaStatistic,
  nationalAverageStatistic,
  hideNationalCaption
}) => {
  const more = areaStatistic > nationalAverageStatistic;

  return (
    <div
      css={css`
        ${fontSizeSmall}
        ${fontColorBlack}
        margin-top: 0;
        margin-bottom: 30px;
      `}
    >
      {render}
      <div>
        <div
          css={css`
        ${barChart}
        width: ${
          more ? "100%" : (areaStatistic / nationalAverageStatistic) * 100 + "%"
        };
        background: ${more ? colorRed : colorOrange};
        ${positionText}
      `}
        >
          <div css={barChartCaption}>{areaName}</div>
        </div>
        <div
          css={css`
        ${barChart}
        width: ${
          !more
            ? "100%"
            : (nationalAverageStatistic / areaStatistic) * 100 + "%"
        };
        background: grey;
        ${positionText}
      `}
        >
          <div
            css={css`
              ${barChartCaption}
              ${hideNationalCaption ? "display: none;" : ""}
            `}
          >
            National Average
          </div>
        </div>
      </div>
    </div>
  );
};
export default StatisticBlock;
