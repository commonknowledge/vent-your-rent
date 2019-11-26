/** @jsx jsx */
import { useQuery } from "@apollo/react-hooks";
import { css, jsx } from "@emotion/core";
import Emoji from "a11y-react-emoji";
import { format } from "d3-format";
import gql from "graphql-tag";
import { Fragment } from "react";
import { RouteComponentProps } from "react-router";

import {
  OpenEndedTenancies,
  RentControls,
  WelfareSystemThatSupportsHousing,
  NationalDatabaseOfLandlordsAndRents
} from "../components/demands";
import Page from "../components/Page";
import { PageWidth } from "../components/PageElements";
import StatisticBlock from "../components/StatisticBlock";
import TakeActionBlock from "../components/TakeActionBlock";
import VentsBlock from "../components/VentsBlock";
import {
  colorWhite,
  fontColorBlack,
  fontSizeLarge,
  fontSizeMedium,
  paddingCss,
  equalTopAndBottomPadding
} from "../styles";
import {
  Statistics,
  Statistics_statisticsForPostcode
} from "./__graphql__/Statistics";
import RenterManifestoBlock from "../components/RenterManifestoBlock";
import GenerationRentBlock from "../components/GenerationRentBlock";
import Footer from "../components/Footer";
import Rule from "../components/Rule";

const formatNumberWithCommas = format(",");
const formatNumberAsRoundedPercentage = format(".0%");
const _formatNumberAsMoney = format("($,.0f");
const formatNumberAsMoney = (n: number) =>
  _formatNumberAsMoney(n).replace("$", "£");

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
  history,
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
      onSignup={() => history.push("/welcome-to-the-movement")}
    />
  );
};

const ResultsPageView: React.FC<{
  postcode: string;
  stats?: Statistics_statisticsForPostcode;
  loading?: boolean;
  error?: any;
  onSignup: () => void;
}> = ({ postcode, stats, loading, error, onSignup }) => {
  if (loading || !stats) {
    return (
      <Page>
        <div>
          <div
            css={css`
              ${paddingCss}
              text-align: center;
            `}
          >
            <Emoji symbol="🔍" /> loading that terrible rent situation in{" "}
            {postcode}
          </div>
        </div>
      </Page>
    );
  }

  const averageRentPrice = 675;
  const averageRentMoreOrLess =
    stats.twoBedRentPrice > averageRentPrice ? "more" : "less";
  const averageRentDifference =
    averageRentMoreOrLess === "more"
      ? stats.twoBedRentPrice - averageRentPrice
      : averageRentPrice - stats.twoBedRentPrice;

  return (
    <Page>
      <div>
        <PageWidth>
          <div
            css={css`
              ${paddingCss}
            `}
          >
            <h1
              css={css`
                ${fontSizeLarge}
                ${fontColorBlack}

                /* or 100% */
                letter-spacing: -0.03em;
              `}
            >
              You're one of{" "}
              {formatNumberWithCommas(stats.numberOfPrivateRenters)} private
              renters in {stats.constituencyName}
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
              <p>
                Scroll down to see what the renting crisis looks like in your
                area.
              </p>
            </div>
            <Rule />
            {stats.twoBedRentPrice && (
              <StatisticBlock
                render={
                  <Fragment>
                    <p>
                      The rent on a typical two-bed home in{" "}
                      {stats.adminDistrictName} is{" "}
                      <strong>
                        {formatNumberAsMoney(stats.twoBedRentPrice)}
                      </strong>
                      . This is{" "}
                      <strong>
                        {formatNumberAsMoney(averageRentDifference)}{" "}
                        {averageRentMoreOrLess}
                      </strong>{" "}
                      than the national average.
                    </p>
                    <p>
                      High rents stop us from enjoying a decent standard of
                      living and saving for the future.
                    </p>
                  </Fragment>
                }
                areaName={stats.adminDistrictName}
                areaStatistic={stats.twoBedRentPrice}
                nationalAverageStatistic={averageRentPrice}
              />
            )}
            {stats.wageToHousePrice && (
              <StatisticBlock
                render={
                  <Fragment>
                    <p>
                      House prices in {stats.adminDistrictName} are{" "}
                      <strong>
                        {format(".2")(stats.wageToHousePrice)} times more
                      </strong>{" "}
                      than average incomes – the national average is 8.2.
                    </p>
                  </Fragment>
                }
                areaName={stats.constituencyName}
                areaStatistic={stats.wageToHousePrice}
                nationalAverageStatistic={8.2}
              />
            )}
          </div>
        </PageWidth>
        <RentControls />
        <PageWidth>
          <div
            css={css`
              ${paddingCss}
            `}
          >
            {stats.numberOfHousingBenefitRecipients && (
              <StatisticBlock
                render={
                  <Fragment>
                    <p>
                      <strong>
                        {formatNumberWithCommas(
                          stats.numberOfHousingBenefitRecipients
                        )}
                      </strong>{" "}
                      people in {stats.constituencyName} receive housing
                      benefit. The national average is 5,521.
                    </p>
                    <p>
                      Housing benefit is failing those of us on benefits - lots
                      of landlords refuse to rent to us
                    </p>
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
                        {formatNumberAsRoundedPercentage(
                          stats.percentRentersOnUC
                        )}
                      </strong>{" "}
                      of housing benefit recipients in {stats.constituencyName}{" "}
                      are on Universal Credit - the national average is 33%.
                    </p>
                    <p>
                      Delays in Universal Credit payments mean renters can
                      easily get into rent arrears.
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
            `}
          >
            {stats.percentPrivateRenters && (
              <StatisticBlock
                render={
                  <Fragment>
                    <p>
                      In {stats.constituencyName},{" "}
                      <strong>
                        {formatNumberAsRoundedPercentage(
                          stats.percentPrivateRenters
                        )}{" "}
                        of people rent from a private landlord
                      </strong>{" "}
                      - nationally, the proportion is 17%.
                    </p>
                    <p>
                      The number of renters has doubled in the last 15 years but
                      because there were no checks on all those new landlords,
                      it is hard for councils to enforce safety standards.
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
        <NationalDatabaseOfLandlordsAndRents />
        <PageWidth>
          <div
            css={css`
              ${paddingCss}
            `}
          >
            <Fragment>
              <p>
                7 in every 1000 private renters have been made homeless through
                no-fault evictions.
              </p>
              <p>
                Right now, landlords can evict tenants with just two months
                notice, without giving a reason.
              </p>
            </Fragment>
          </div>
        </PageWidth>
        <div
          css={css`
            background: ${colorWhite};
            padding: 40px 20px;
          `}
        >
          <PageWidth>
            <VentsBlock
              title="This is what the renting crisis looks like"
              numberOfVents={3}
            />
          </PageWidth>
        </div>
        <PageWidth>
          <TakeActionBlock postcode={postcode} onSubmit={onSignup} />
        </PageWidth>
      </div>
      <div
        css={css`
          ${paddingCss}
          background: ${colorWhite};
          ${equalTopAndBottomPadding(30)}
        `}
      >
        <PageWidth>
          <GenerationRentBlock />
          <RenterManifestoBlock />
          <Footer />
        </PageWidth>
      </div>
    </Page>
  );
};

export default ResultsPage;
