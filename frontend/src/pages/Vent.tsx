/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Page from "../components/Page";
import ShareBar from "../components/ShareBar";
import { PageWidth } from "../components/PageElements";
import { marginsCss, colorBlack, colorWhite } from "../styles";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Vent from "../components/Vent";
import { useResetScroll } from '../helpers/router';
import { useParams } from "react-router";
import { VentQuery } from './__graphql__/VentQuery';

const VENT_QUERY = gql`
    ${Vent.fragment}

    query VentQuery($id: String!) {
        vent(id: $id) {
            ...VentCard
        }
    }
`

const VentPage = () => {
    useResetScroll();
    const { id } = useParams()
    const { data, loading } = useQuery<VentQuery>(VENT_QUERY, { variables: { id } })

    return (
        <div>
            <div css={css`
            background: ${colorBlack};
            color: ${colorWhite};
            margin: 0;
            padding: 20px 0;
        `}>
                <Page>
                    <PageWidth>
                        <div css={marginsCss}>
                            {data && data.vent ? (
                                <Vent {...data.vent} collapsed={false} />
                            ) : loading ? "Loading" : "Error"}
                        </div>
                    </PageWidth>
                    <div
                        css={css`
                        ${marginsCss}
                        background: ${colorWhite};
                    `}>
                    </div>
                </Page>
            </div >
            <PageWidth>
                <div css={css`
                    margin-top: 20px;
                    margin-bottom: 20px;
                    ${marginsCss}
                `}>
                    <ShareBar
                        message="What does the renting crisis look like near you? #VentYourRent"
                        url="https://ventyour.rent"
                    />
                </div>
            </PageWidth>
        </div>
    );
};

export default VentPage;
