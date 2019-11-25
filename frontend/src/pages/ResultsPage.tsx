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
import { PageWidth } from '../components/PageElements';
import { OpenEndedTenancies } from '../components/demands';

import {
  NationalDatabaseOfLandlordsAndRents,
  RentControls,
  WelfareSystemThatSupportsHousing
} from "../components/demands";

const formatNumberWithCommas = format(",");
const formatNumberAsRoundedPercentage = format(".0%");
const _formatNumberAsMoney = format("($.0f");
const formatNumberAsMoney = (n: number) => _formatNumberAsMoney(n).replace("$", "£");

const STATISTICS_QUERY = gql`
  query Statistics($postcode: String!) {
    statisticsForPostcode(postcode: $postcode) {
      constituencyName: constituencyName
      adminDistrictName: adminDistrictName
      regionName: RegionName

      numberOfPrivateRenters: CONLevelPrivateRent

      twoBedRentPrice: rentMedianvalue2bed

      wageToHousePrice: wageToHousePrice

      numberOfHousingBenefitRecipients: totalHbInclSocial

      percentRentersOnUC: housingPercOnUc

      percentPrivateRenters: CONPercPrivateRent
      percentPrivateRentersNationally: CTRYPercPrivateRent
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
  stats?: Statistics_statisticsForPostcode;
  loading?: boolean;
  error?: any;
}> = ({ postcode, stats, loading, error }) => {
  if (loading || !stats) {
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

  const averageRentPrice = 675
  const averageRentMoreOrLess = stats.twoBedRentPrice > averageRentPrice ? "more" : "less"
  const averageRentDifference = averageRentMoreOrLess === "more" ? stats.twoBedRentPrice - averageRentPrice : averageRentPrice - stats.twoBedRentPrice

  return (
    <Page>
      <div
        css={css`
          padding-bottom: 30px;
        `}
      >
        <PageWidth>
          <div
            css={css`
            ${paddingCss}
          `}>
            <h1
              css={css`
                ${fontSizeLarge}
                ${fontColorBlack}

                /* or 100% */
                letter-spacing: -0.03em;
              `}
            >
              You're one of {formatNumberWithCommas(stats.numberOfPrivateRenters)} private renters in {stats.constituencyName}
            </h1>
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
            {stats.twoBedRentPrice && (
              <StatisticBlock
                render={
                  <Fragment>
                    <p>The rent on a typical two-bed home in {stats.adminDistrictName} is <strong>{formatNumberAsMoney(stats.twoBedRentPrice)}</strong>. That’s <strong>{formatNumberAsMoney(averageRentDifference)} {averageRentMoreOrLess}</strong> than the national average.</p>
                    <p>High rents stop us from enjoying a decent standard of living and saving for the future.</p>
                  </Fragment>
                }
                areaName={stats.adminDistrictName}
                nationalAverageStatistic={stats.twoBedRentPrice}
                areaStatistic={averageRentPrice}
              />
            )}
            {stats.wageToHousePrice && (
              <StatisticBlock
                render={
                  <Fragment>
                    House prices in {stats.constituencyName} are{" "}
                    <strong>
                      {format(".2")(stats.wageToHousePrice)} times more
                    </strong>{" "}
                    than average incomes.
                  </Fragment>
                }
                areaName={stats.constituencyName}
                nationalAverageStatistic={stats.wageToHousePrice}
                areaStatistic={stats.wageToHousePrice}
              />
            )}
          </div>
        </PageWidth>
        <RentControls />
        <PageWidth>
          <div
            css={css`
            ${paddingCss}
          `}>
            {stats.numberOfHousingBenefitRecipients && (
              <StatisticBlock
                render={
                  <Fragment>
                    <strong>
                      {formatNumberWithCommas(stats.numberOfHousingBenefitRecipients)}
                    </strong>{" "}
                    people in {stats.constituencyName} receive housing benefit. The national average is 5,521.
              </Fragment>
                }
                areaName={stats.constituencyName}
                areaStatistic={stats.numberOfHousingBenefitRecipients}
                nationalAverageStatistic={5521}
              />
            )}
            {stats.percentRentersOnUC && (
              <StatisticBlock
                render={
                  <Fragment>
                    <p>
                      <strong>
                        {formatNumberAsRoundedPercentage(stats.percentRentersOnUC)}
                      </strong>{" "}
                      of renters in {stats.constituencyName} are on Universal Credit. The national average is 33%.
                </p>
                    <p>
                      Delays in Universal Credit payments mean renters can easily
                      get into rent arrears.
                </p>
                  </Fragment>
                }
                areaName={stats.constituencyName}
                areaStatistic={stats.percentRentersOnUC}
                nationalAverageStatistic={0.33}
              />
            )}
          </div>
        </PageWidth>
        <WelfareSystemThatSupportsHousing />
        <PageWidth>
          <div
            css={css`
            ${paddingCss}
          `}>
            {stats.percentPrivateRenters && (
              <StatisticBlock
                render={
                  <Fragment>
                    <p>
                      In {stats.constituencyName},{" "}
                      <strong>
                        {formatNumberAsRoundedPercentage(stats.percentPrivateRenters)}
                      </strong> of people
                        rent from a private landlord. The national average is 17%.
                    </p>
                    <p>
                      The number of renters has <strong>doubled</strong> in the last
                      15 years. However, there is no national database of landlords.
                    </p>
                  </Fragment>
                }
                areaName={stats.constituencyName}
                areaStatistic={stats.percentPrivateRenters}
                nationalAverageStatistic={stats.percentPrivateRentersNationally}
              />
            )}
          </div>
        </PageWidth>
        <OpenEndedTenancies />
        <PageWidth>
          <div
            css={css`
            ${paddingCss}
          `}>
            <Fragment>
              <p>
                7 in every 1000 private renters have been made homeless through no-fault evictions.
              </p>
              <p>
                Right now, landlords can evict tenants with just two months notice, without giving a reason.
              </p>
            </Fragment>
          </div>
        </PageWidth>
        <PageWidth>
          <VentsBlock
            title="This is what the renting crisis looks like"
            numberOfVents={3}
          />
          <TakeActionBlock />
        </PageWidth>
      </div>
    </Page>
  );
};

export default ResultsPage;
