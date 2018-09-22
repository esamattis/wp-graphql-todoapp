import ApolloClient from "apollo-boost";
import React from "react";
import {ApolloProvider} from "react-apollo";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";

import TodoApp from "./components/TodoApp";

const client = new ApolloClient({});

const Root = () => (
    <ApolloProvider client={client}>
        <Router>
            <div>
                <TodoApp />
                <div id="overlay-container" />
            </div>
        </Router>
    </ApolloProvider>
);

const root = document.getElementById("root");

if (root) {
    ReactDOM.render(<Root />, root);
}
