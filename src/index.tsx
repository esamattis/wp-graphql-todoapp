import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloClient} from "apollo-client";
import {onError} from "apollo-link-error";
import {createHttpLink} from "apollo-link-http";
import {createPersistedQueryLink} from "apollo-link-persisted-queries";
import React from "react";
import {ApolloProvider} from "react-apollo";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";

import Main from "./components/Main";

const link = createPersistedQueryLink({
    useGETForHashedQueries: true,
})
    .concat(
        onError(({graphQLErrors, networkError}) => {
            if (graphQLErrors) {
                graphQLErrors.forEach(({message}) =>
                    console.log(`[GraphQL error]: Message: ${message}`),
                );
            }
            if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
    )
    .concat(createHttpLink({uri: "/graphql"}));

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});

const Root = () => (
    <ApolloProvider client={client}>
        <Router>
            <div>
                <Main />
                <div id="overlay-container" />
            </div>
        </Router>
    </ApolloProvider>
);

const root = document.getElementById("root");

if (root) {
    ReactDOM.render(<Root />, root);
}
