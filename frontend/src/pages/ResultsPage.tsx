/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Fragment } from "react";
import Page from "../components/Page";
import StatisticBlock from "../components/StatisticBlock";
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

import {
  NationalDatabaseOfLandlordsAndRents,
  RentControls,
  WelfareSystemThatSupportsHousing
} from "../components/demands";

const formatNumberWithCommas = format(",");
const formatNumberAsRoundedPercentage = format(".0%");

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
              {formatNumberAsRoundedPercentage(stats.prsSize)} of the population
              of {constituencyName} rent privately
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
                href="https://www.rentermanifesto.org/read_the_manifesto_full"
                css={css`
                  ${fontColorBlack}
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
                than average incomes.
              </Fragment>
            }
            areaName={constituencyName}
            nationalAverageStatistic={stats.wageToHousePrice}
            areaStatistic={stats.wageToHousePrice}
          />
        )}
        <RentControls />
        {stats.totalHbInclSocial && (
          <StatisticBlock
            render={
              <Fragment>
                <strong>
                  {formatNumberWithCommas(stats.totalHbInclSocial)}
                </strong>{" "}
                people in {constituencyName} receive housing benefit.
              </Fragment>
            }
            areaName={constituencyName}
            nationalAverageStatistic={stats.totalHbInclSocial}
            areaStatistic={stats.totalHbInclSocial}
          />
        )}
        {stats.housingPercOnUc && (
          <StatisticBlock
            render={
              <Fragment>
                <p>
                  <strong>
                    {formatNumberAsRoundedPercentage(stats.housingPercOnUc)}
                  </strong>{" "}
                  of renters in {constituencyName} are on Universal Credit.
                </p>
                <p>
                  Delays in Universal Credit payments mean renters can easily
                  get into rent arrears.
                </p>
              </Fragment>
            }
            areaName={constituencyName}
            areaStatistic={stats.housingPercOnUc}
          />
        )}
        <WelfareSystemThatSupportsHousing />
        {stats.prsSize && (
          <StatisticBlock
            render={
              <Fragment>
                <p>
                  In {constituencyName},{" "}
                  <strong>
                    {formatNumberAsRoundedPercentage(stats.prsSize)} of people
                    rent from a private landlord
                  </strong>
                  .
                </p>
                <p>
                  The number of renters has <strong>doubled</strong> in the last
                  15 years. However, there is no national database of landlords.
                </p>
              </Fragment>
            }
            areaName={constituencyName}
            areaStatistic={stats.prsSize}
          />
        )}
        <NationalDatabaseOfLandlordsAndRents />
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
