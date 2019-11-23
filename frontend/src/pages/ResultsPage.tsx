/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Fragment } from "react";
import Page from "../components/Page";
import StatisticBlock from "../components/StatisticBlock";
import DemandBlock from "../components/DemandBlock";
import VentsBlock from "../components/VentsBlock";
import TakeActionBlock from "../components/TakeActionBlock";
import GenerationRentBlock from "../components/GenerationRentBlock";
import RenterManifestoBlock from "../components/RenterManifestoBlock";
import { marginsCss } from "../styles";

const ResultsPage = () => (
  <Page>
    <div
      css={css`
        ${marginsCss}
      `}
    >
      <h1>You're one of 9,056 private renters in Tottenham</h1>
      <h2>
        Private renters have less security over their homes and are more likely
        to be living in poor conditions.
      </h2>
      <hr />
      <StatisticBlock
        render={() => (
          <Fragment>
            The rent on a typical two-bed home in Tottenham is{" "}
            <strong>£1,525</strong>. That’s <strong>£850</strong> more than the
            national average.
          </Fragment>
        )}
        areaName="Tottenham"
        nationalAverageStatistic={1000}
        areaStatistic={800}
      />
      <StatisticBlock
        render={() => (
          <Fragment>
            House prices in Tottenham are <strong>13.6 times more</strong> than
            average incomes. The national average is 8.2.
          </Fragment>
        )}
        areaName="Tottenham"
        nationalAverageStatistic={1000}
        areaStatistic={800}
      />
      <DemandBlock demand="We demand rent controls which bring down rents to 30% of local income." />
      <StatisticBlock
        render={() => (
          <Fragment>
            <strong>17,157</strong> people in Tottenham receive housing benefit.
            The national average is 5,521.
          </Fragment>
        )}
        areaName="Tottenham"
        nationalAverageStatistic={1000}
        areaStatistic={800}
      />
      <DemandBlock demand="We demand a welfare system that supports access to safe, secure housing." />
      <StatisticBlock
        render={() => (
          <Fragment>
            The rent on a typical two-bed home in Tottenham is{" "}
            <strong>£1,525</strong>. That’s <strong>£850 more</strong> than the
            national average.
          </Fragment>
        )}
        areaName="Tottenham"
        nationalAverageStatistic={1000}
        areaStatistic={800}
      />
      <StatisticBlock
        render={() => (
          <Fragment>
            House prices in Tottenham are <strong>13.6 times</strong> more than
            average incomes. The national average is 8.2.
          </Fragment>
        )}
        areaName="Tottenham"
        nationalAverageStatistic={1000}
        areaStatistic={800}
      />
    </div>
    <VentsBlock
      title="This is what the renting crisis looks like near you:"
      numberOfVents={3}
    />
    <TakeActionBlock />
    <GenerationRentBlock />
    <RenterManifestoBlock />
  </Page>
);

export default ResultsPage;
