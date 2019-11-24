/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Fragment } from "react";
import Page from "../components/Page";
import StatisticBlock from "../components/StatisticBlock";
import DemandBlock from "../components/DemandBlock";
import VentsBlock from "../components/VentsBlock";
import TakeActionBlock from "../components/TakeActionBlock";
import {
  paddingCss,
  fontSizeLarge,
  fontColorBlack,
  fontSizeMedium
} from "../styles";
import { useQuery } from "@apollo/react-hooks";
import { RouteComponentProps } from "react-router-dom";
import gql from "graphql-tag";
import {
  Statistics,
  Statistics_statisticsForPostcode
} from "./__graphql__/Statistics";
import { format } from "d3-format";
const comma = format(",");

const STATISTICS_QUERY = gql`
  query Statistics($postcode: String!) {
    statisticsForPostcode(postcode: $postcode) {
      prsSize
      wageToHousePrice
      ucHousing
      housingPercOnUc
      totalHbInclSocial
      majority
      geo {
        parliamentaryConstituency
      }
    }
  }
`;

const ResultsPage: React.FC<RouteComponentProps<{ postcode: string }>> = ({
  match: {
    params: { postcode }
  }
}) => {
  const { data, loading, error } = useQuery<Statistics>(STATISTICS_QUERY, {
    variables: { postcode }
  });

  return (
    <ResultsPageView
      postcode={postcode}
      constituencyName={
        data && data.statisticsForPostcode
          ? data.statisticsForPostcode.geo.parliamentaryConstituency
          : undefined
      }
      stats={
        data && data.statisticsForPostcode
          ? data.statisticsForPostcode
          : undefined
      }
      loading={loading}
      error={error}
    />
  );
};

const ResultsPageView: React.FC<{
  postcode: string;
  constituencyName?: string;
  stats?: Statistics_statisticsForPostcode;
  loading?: boolean;
  error?: any;
}> = ({ postcode, constituencyName, stats, loading, error }) => {
  if (loading || !stats || !constituencyName) {
    return (
      <Page>
        <div
          css={css`
            padding-bottom: 30px;
          `}
        >
          <div
            css={css`
              ${paddingCss}
            `}
          >
            Loading up the rent situation in {postcode}
          </div>
        </div>
      </Page>
    );
  }

  const dataRequired = "data required";

  return (
    <Page>
      <div
        css={css`
          padding-bottom: 30px;
        `}
      >
        <div
          css={css`
            ${paddingCss}
          `}
        >
          {stats.prsSize && (
            <h1
              css={css`
                ${fontSizeLarge}
                ${fontColorBlack}

                /* or 100% */
                letter-spacing: -0.03em;
              `}
            >
              You're one of {comma(stats.prsSize)} private renters in{" "}
              {constituencyName}
            </h1>
          )}
          <div
            css={css`
              ${fontSizeMedium}
              ${fontColorBlack}
            `}
          >
            <p>
              Renting in the UK isn’t a walk in the park. In return for high
              rents, we suffer poor conditions and have very little security.
            </p>
            <p>
              That’s why renters have come together to write the{" "}
              <a
                href="#"
                css={css`
                  color: inherit;
                  font-weight: bold;
                `}
              >
                Renter Manifesto
              </a>{" "}
              — so that together we can change the story.
            </p>
            <p>Here’s what the renting crisis looks like in your area:</p>
          </div>
        </div>
        {stats.wageToHousePrice && (
          <StatisticBlock
            render={
              <Fragment>
                House prices in {constituencyName} are{" "}
                <strong>
                  {format(".2")(stats.wageToHousePrice)} times more
                </strong>{" "}
                than average incomes. The national average is {dataRequired}
                {}.
              </Fragment>
            }
            areaName={constituencyName}
            nationalAverageStatistic={stats.wageToHousePrice}
            areaStatistic={stats.wageToHousePrice}
          />
        )}
        <DemandBlock demand="We demand rent controls which bring down rents to 30% of local income." />
        {stats.totalHbInclSocial && (
          <StatisticBlock
            render={
              <Fragment>
                <strong>{comma(stats.totalHbInclSocial)}</strong> people in{" "}
                {constituencyName} receive housing benefit. The national average
                is {dataRequired}.
              </Fragment>
            }
            areaName={constituencyName}
            nationalAverageStatistic={stats.totalHbInclSocial}
            areaStatistic={stats.totalHbInclSocial}
          />
        )}
        <DemandBlock demand="We demand a welfare system that supports access to safe, secure housing." />
        {/* <StatisticBlock
          render={() => (
            <Fragment>
              The rent on a typical two-bed home in {constituencyName} is{" "}
              <strong>£1,525</strong>. That’s <strong>£850 more</strong> than the
              national average.
          </Fragment>
          )}
          areaName={constituencyName}
          nationalAverageStatistic={1000}
          areaStatistic={800}
        /> */}
        {/* <StatisticBlock
          render={() => (
            <Fragment>
              House prices in {constituencyName} are <strong>13.6 times</strong> more than
              average incomes. The national average is 8.2.
          </Fragment>
          )}
          areaName={constituencyName}
          nationalAverageStatistic={1000}
          areaStatistic={800}
        />
      </div> */}
        <VentsBlock
          title="This is what the renting crisis looks like near you:"
          numberOfVents={3}
        />
        <TakeActionBlock />
      </div>
    </Page>
  );
};

export default ResultsPage;
