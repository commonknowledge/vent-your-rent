/** @jsx jsx */
import { jsx } from "@emotion/core";

import { FunctionComponent } from "react";

type StatisticBlockProps = {
  areaName: string;
  areaStatistic: number;
  graphColour?: "red" | "orange";
  nationalAverageStatistic: number;
  render: () => JSX.Element;
};

const StatisticBlock: FunctionComponent<StatisticBlockProps> = props => (
  <div>
    <p>{props.render()}</p>
    <div>Tottenham</div>
    <div>National Average</div>
  </div>
);

export default StatisticBlock;
