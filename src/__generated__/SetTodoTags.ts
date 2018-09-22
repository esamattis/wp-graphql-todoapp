/* tslint:disable */
// This file was automatically generated and should not be edited.

import { todoTodoTagsNodes } from "./..\\..\\__generated__\\globalTypes";

// ====================================================
// GraphQL mutation operation: SetTodoTags
// ====================================================

export interface SetTodoTags_updateTodo_todo_todoTags_edges_node {
  /**
   * The global ID for the todotag
   */
  id: string;
  /**
   * The human friendly name of the object.
   */
  name: string | null;
}

export interface SetTodoTags_updateTodo_todo_todoTags_edges {
  /**
   * The item at the end of the edge
   */
  node: SetTodoTags_updateTodo_todo_todoTags_edges_node | null;
}

export interface SetTodoTags_updateTodo_todo_todoTags {
  /**
   * Information to aid in pagination
   */
  edges: (SetTodoTags_updateTodo_todo_todoTags_edges | null)[] | null;
}

export interface SetTodoTags_updateTodo_todo {
  /**
   * The globally unique ID for the object
   */
  id: string;
  /**
   * A collection of todoTags objects
   */
  todoTags: SetTodoTags_updateTodo_todo_todoTags | null;
}

export interface SetTodoTags_updateTodo {
  todo: SetTodoTags_updateTodo_todo | null;
}

export interface SetTodoTags {
  updateTodo: SetTodoTags_updateTodo | null;
}

export interface SetTodoTagsVariables {
  id: string;
  nodes: todoTodoTagsNodes[];
}
