/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DualTodoList
// ====================================================

export interface DualTodoList_todos_edges_node {
  /**
   * The globally unique ID for the object
   */
  id: string;
  /**
   * The id field matches the WP_Post-&gt;ID field.
   */
  wpId: number;
  /**
   * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
   */
  title: string | null;
  /**
   * Is TODO completed
   */
  completed: boolean | null;
  /**
   * The current status of the object
   */
  status: string | null;
}

export interface DualTodoList_todos_edges {
  /**
   * The item at the end of the edge
   */
  node: DualTodoList_todos_edges_node | null;
}

export interface DualTodoList_todos_pageInfo {
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface DualTodoList_todos {
  /**
   * Information to aid in pagination
   */
  edges: (DualTodoList_todos_edges | null)[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: DualTodoList_todos_pageInfo;
}

export interface DualTodoList_dones_edges_node {
  /**
   * The globally unique ID for the object
   */
  id: string;
  /**
   * The id field matches the WP_Post-&gt;ID field.
   */
  wpId: number;
  /**
   * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
   */
  title: string | null;
  /**
   * Is TODO completed
   */
  completed: boolean | null;
  /**
   * The current status of the object
   */
  status: string | null;
}

export interface DualTodoList_dones_edges {
  /**
   * The item at the end of the edge
   */
  node: DualTodoList_dones_edges_node | null;
}

export interface DualTodoList_dones_pageInfo {
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface DualTodoList_dones {
  /**
   * Information to aid in pagination
   */
  edges: (DualTodoList_dones_edges | null)[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: DualTodoList_dones_pageInfo;
}

export interface DualTodoList {
  /**
   * A collection of todos objects
   */
  todos: DualTodoList_todos | null;
  /**
   * A collection of todos objects
   */
  dones: DualTodoList_dones | null;
}

export interface DualTodoListVariables {
  cursorTodos: string;
  cursorDones: string;
}
