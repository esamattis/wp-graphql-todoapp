import ApolloClient from "apollo-boost";
import React from "react";
import {ApolloProvider} from "react-apollo";
import ReactDOM from "react-dom";

import TodoApp from "./components/TodoApp";

const client = new ApolloClient({
    // uri: "https://w5xlvm3vzz.lp.gql.zone/graphql",
});

const Root = () => (
    <ApolloProvider client={client}>
        <TodoApp />
    </ApolloProvider>
);

const root = document.getElementById("root");

if (root) {
    ReactDOM.render(<Root />, root);
}
