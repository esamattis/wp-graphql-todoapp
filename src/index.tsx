import ReactDOM from "react-dom";
import React from "react";
import TodoApp from "./components/TodoApp";

import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    // uri: "https://w5xlvm3vzz.lp.gql.zone/graphql",
});

import {ApolloProvider} from "react-apollo";

const Root = () => (
    <ApolloProvider client={client}>
        <TodoApp />
    </ApolloProvider>
);

const root = document.getElementById("root");

if (root) {
    ReactDOM.render(<Root />, root);
}
