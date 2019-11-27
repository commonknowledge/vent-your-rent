import * as React from "react";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { createUploadLink } from 'apollo-upload-client'
import { ApolloLink } from "apollo-link";
import { toIdValue } from "apollo-utilities";

const cache: any = new InMemoryCache({
    cacheRedirects: {
        Query: {
            vent: (_, { id }) => toIdValue(cache.config.dataIdFromObject({ __typename: 'VentType', id })),
        }
    }
});

const initialCacheState = {
    data: {}
};

const GRAPHQL_ENDPOINT = `${process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : ''}/graphql/`; // process.env.process.env
const httpLink = createUploadLink({ uri: GRAPHQL_ENDPOINT });

export const client = new ApolloClient({
    link: ApolloLink.from([httpLink]),
    defaultOptions: {
        // Docs: https://www.apollographql.com/docs/react/features/error-handling/#error-policies
        query: {
            errorPolicy: "all" // Prefer to display data where possible
        }
    },
    // @ts-ignore
    connectToDevTools: process.env.NODE_ENV === "development",
    cache
});

cache.writeData(initialCacheState);

client.onResetStore(() => {
    return Promise.resolve(cache.writeData(initialCacheState));
});

const GraphQLProvider: React.FC = ({ children }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GraphQLProvider;
