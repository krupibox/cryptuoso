import { useMemo } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                robots: offsetLimitPagination(),
            },
        },
    },
});

let apolloClient;

function createApolloClient() {
    return new ApolloClient({
        uri: "https://hasura.dev.cryptuoso.com/v1/graphql",
        cache,
    });
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    if (initialState) {
        const existingCache = _apolloClient.extract();
        _apolloClient.cache.restore({ ...existingCache, ...initialState });
    }
    if (typeof window === "undefined") return _apolloClient;

    if (!apolloClient) apolloClient = _apolloClient;
    return _apolloClient;
}

export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}