/** @jsx jsx */
import { useQuery } from "@apollo/react-hooks";
import { css, jsx } from "@emotion/core";
import Emoji from "a11y-react-emoji";
import { format } from "d3-format";
import gql from "graphql-tag";
import { Fragment } from "react";
import { RouteComponentProps } from "react-router";
import {
  NationalDatabaseOfLandlordsAndRents,
  RentControls,
  WelfareSystemThatSupportsHousing
} from "../../components/demands";
import Footer from "../../components/Footer";
import GenerationRentBlock from "../../components/GenerationRentBlock";
import Page from "../../components/Page";
import { PageWidth } from "../../components/PageElements";
import RenterManifestoBlock from "../../components/RenterManifestoBlock";
import Rule from "../../components/Rule";
import StatisticBlock from "../../components/StatisticBlock";
import TakeActionBlock from "../../components/TakeActionBlock";
import VentsBlock from "../../components/VentsBlock";
import { OpenEndedTenancies } from "../../components/demands";
import {
  colorWhite,
  equalTopAndBottomPadding,
  fontColorBlack,
  fontSizeLarge,
  fontSizeMedium,
  paddingCss
} from "../../styles";
import {
  Statistics,
  Statistics_statisticsForPostcode
} from "./__graphql__/Statistics";

const formatNumberWithCommas = format(",");
const formatNumberAsRoundedPercentage = format(".0%");
const _formatNumberAsMoney = format("($,.0f");
const formatNumberAsMoney = (n: number) =>
  _formatNumberAsMoney(n).replace("$", "£");

const STATISTICS_QUERY = gql`
  query Statistics($postcode: String!) {
    statisticsForPostcode(postcode: $postcode) {
      constituencyName
      adminDistrictName
      regionName: RegionName

      numberOfPrivateRenters: CONLevelPrivateRent

      twoBedRentPrice: rentMedianvalue2bed

      wageToHousePrice

      numberOfHousingBenefitRecipients: totalHbInclSocial

      percentRentersOnUC: housingPercOnUc

      percentPrivateRenters: CONPercPrivateRent
      percentPrivateRentersNationally: CTRYPercPrivateRent

      noFaultEvictionHomelessnessCasesPer1000
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
      onSignup={() => history.push("/search/welcome-to-the-movement")}
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
              padding: 40px 20px;
              text-align: center;
            `}
          >
            <Emoji symbol="🔍" /> Loading that terrible rent situation in{" "}
            {postcode}
          </div>
        </div>
      </Page>
    );
  }

  const averageRentPrice = 675;

  let averageRentMoreOrLess = "";

  if (stats.twoBedRentPrice) {
    averageRentMoreOrLess =
      stats.twoBedRentPrice > averageRentPrice ? "more" : "less";
  }

  let averageRentDifference = 0;

  if (stats.twoBedRentPrice) {
    averageRentDifference =
      averageRentMoreOrLess === "more"
        ? stats.twoBedRentPrice - averageRentPrice
        : averageRentPrice - stats.twoBedRentPrice;
  }

  return (
    <Page>
      <div>
        <PageWidth>
          <div
            css={css`
              ${paddingCss}
            `}
          >
            {stats.numberOfPrivateRenters && (
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

              <p>
                Your parliamentary constituency is{" "}
                <strong>{stats.constituencyName}</strong> and your local council
                is <strong>{stats.adminDistrictName}</strong>.
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
                      than the national average which is £{averageRentPrice} per
                      month.
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
            <Rule secondary />
            {stats.wageToHousePrice && (
              <StatisticBlock
                render={
                  <Fragment>
                    <p>
                      House prices in {stats.constituencyName} are{" "}
                      <strong>
                        {format(".2")(stats.wageToHousePrice)} times more
                      </strong>{" "}
                      than average incomes – the national average is{" "}
                      <strong>8.2</strong>.
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
                      benefit. The national average is <strong>5,521</strong>.
                    </p>
                    <p>
                      Housing benefit is failing those of us on benefits - lots
                      of landlords refuse to rent to us.
                    </p>
                  </Fragment>
                }
                areaName={stats.constituencyName}
                areaStatistic={stats.numberOfHousingBenefitRecipients}
                nationalAverageStatistic={5521}
              />
            )}
            <Rule secondary />
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
                      are on Universal Credit - the national average is{" "}
                      <strong>33%</strong>.
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
            {stats.percentPrivateRenters &&
              stats.percentPrivateRentersNationally && (
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
                        - nationally, the proportion is <strong>17%</strong>.
                      </p>
                      <p>
                        The number of renters has doubled in the last 15 years
                        but because there were no checks on all those new
                        landlords, it is hard for councils to enforce safety
                        standards.
                      </p>
                    </Fragment>
                  }
                  areaName={stats.constituencyName}
                  areaStatistic={stats.percentPrivateRenters}
                  nationalAverageStatistic={
                    stats.percentPrivateRentersNationally
                  }
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
            {stats.noFaultEvictionHomelessnessCasesPer1000 && (
              <StatisticBlock
                render={
                  <Fragment>
                    <p>
                      In {stats.adminDistrictName}{" "}
                      <strong>
                        {stats.noFaultEvictionHomelessnessCasesPer1000} private
                        renters in every 1000 were made homeless last year
                      </strong>{" "}
                      through no-fault evictions. The national average was{" "}
                      <strong>7 per 1000 private renters</strong>.
                    </p>
                    <p>
                      Right now, landlords can evict tenants with just two
                      months notice, without giving a reason. It means we fear
                      asking for essential repairs in case our landlord reacts
                      with a revenge eviction.
                    </p>
                  </Fragment>
                }
                areaName={stats.adminDistrictName}
                areaStatistic={stats.noFaultEvictionHomelessnessCasesPer1000}
                nationalAverageStatistic={7}
              />
            )}
          </div>
        </PageWidth>
        <OpenEndedTenancies />
        <div
          css={css`
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
        <TakeActionBlock postcode={postcode} onSubmit={onSignup} />
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
