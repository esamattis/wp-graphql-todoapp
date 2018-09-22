import React from "react";
import {Query} from "react-apollo";
import styled from "react-emotion";
import FlipMove from "react-flip-move";
import {Route, Switch} from "react-router";
import {NavLink as Link} from "react-router-dom";

import {
    DualTodoList,
    DualTodoListVariables,
} from "../__generated__/DualTodoList";
import {DualTodoListByTagsVariables} from "../__generated__/DualTodoListByTags";
import {DualTodoListByTagsQuery, DualTodoListQuery} from "../queries";
import {
    concatEdgesAtKey,
    EdgeNodeType,
    getEdgeNodes,
    getPageInfo,
    notEmpty,
} from "../utils";

import {AddTodoInput} from "./AddTodoInput";
import {Colors, RedButton, Row, Title, View} from "./core";
import {TodoItem} from "./TodoItem";

const BlackTitle = styled(Title)({
    color: Colors.black,
});

const TodoColumn = styled(View)({
    color: Colors.black,
    alignItems: "center",
    width: 350,
});

const LoadingText = styled(View)<{visible: boolean}>(
    {
        color: Colors.black,
        alignItems: "center",
    },
    props => ({
        visibility: props.visible ? "visible" : "hidden",
    }),
);

function asTodoTagsVariable(todoTags: string[]) {
    if (todoTags.length > 0) {
        return {todoTags: todoTags};
    }
    return {};
}

const TodoTracks = (props: {tags: string[]}) => (
    <Query<DualTodoList, DualTodoListVariables | DualTodoListByTagsVariables>
        query={
            props.tags.length > 0 ? DualTodoListByTagsQuery : DualTodoListQuery
        }
        variables={{
            cursorTodos: "",
            cursorDones: "",
            ...asTodoTagsVariable(props.tags),
        }}
    >
        {res => {
            if (res.error || !res.data) return <p>Error :(</p>;

            if (!res.data.todos || !res.data.dones) {
                return <p>Loading...</p>;
            }

            const todos = getEdgeNodes(res.data, "todos");
            const dones = getEdgeNodes(res.data, "dones");

            const allTodos = todos
                .concat(dones)
                .filter(todo => todo.status === "publish");

            const todosPageInfo = getPageInfo(res.data, "todos");
            const donesPageInfo = getPageInfo(res.data, "dones");

            if (!donesPageInfo || !todosPageInfo) {
                throw new Error("pageinfo fail");
            }

            const hasMore =
                todosPageInfo.hasNextPage || donesPageInfo.hasNextPage;

            const fetchMore = () => {
                res.fetchMore({
                    variables: {
                        cursorTodos: todosPageInfo.endCursor || "",
                        cursorDones: donesPageInfo.endCursor || "",
                        ...(asTodoTagsVariable(props.tags) as any), // type fail on apollo-client
                    },

                    updateQuery: (cache, next) => {
                        if (!next.fetchMoreResult) {
                            return cache;
                        }

                        let nextCache = cache;

                        nextCache = concatEdgesAtKey(
                            "todos",
                            nextCache,
                            next.fetchMoreResult,
                        );

                        nextCache = concatEdgesAtKey(
                            "dones",
                            nextCache,
                            next.fetchMoreResult,
                        );

                        return nextCache;
                    },
                });
            };

            return (
                <View>
                    <LoadingText visible={res.loading}>Loading...</LoadingText>
                    <Row>
                        <TodoList
                            title="Todo"
                            todos={allTodos.filter(todo => !todo.completed)}
                        />
                        <TodoList
                            title="Done"
                            todos={allTodos.filter(todo => todo.completed)}
                        />
                    </Row>
                    <View>
                        <View style={{height: 25}} />
                        {hasMore && (
                            <RedButton onClick={fetchMore}>More</RedButton>
                        )}
                        <View style={{height: 50}} />
                    </View>
                </View>
            );
        }}
    </Query>
);

type TodoNode = EdgeNodeType<DualTodoList, "todos">;

const TodoList = (props: {title: string; todos: TodoNode[]}) => (
    <TodoColumn>
        <BlackTitle level="2">{props.title}</BlackTitle>
        <FlipMove>
            {props.todos.map(todo => (
                <div key={todo.wpId}>
                    <TodoItem
                        id={todo.id}
                        wpId={todo.wpId}
                        title={todo.title || ""}
                        completed={todo.completed || false}
                        tags={getEdgeNodes(todo, "tags")
                            .map(tag => tag.name)
                            .filter(notEmpty)}
                    />
                </div>
            ))}
        </FlipMove>
    </TodoColumn>
);

const MainContainer = styled(View)({
    paddingTop: 20,
    backgroundColor: Colors.white,
    alignItems: "center",
});

const TitleLink = styled(BlackTitle.withComponent(Link))({
    textDecoration: "none",
});

class TodoApp extends React.Component {
    render() {
        return (
            <MainContainer>
                <TitleLink to="/">
                    <BlackTitle level="1">WP GraphQL Todo App</BlackTitle>
                </TitleLink>
                <View style={{height: 50}} />
                <AddTodoInput />
                <View style={{height: 50}} />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <TodoTracks tags={[]} />}
                    />
                    <Route
                        path="/tag/:tag"
                        render={route => (
                            <TodoTracks tags={route.match.params.tag} />
                        )}
                    />
                </Switch>
            </MainContainer>
        );
    }
}

export default TodoApp;
