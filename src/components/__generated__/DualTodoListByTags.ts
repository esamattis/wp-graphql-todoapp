/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DualTodoListByTags
// ====================================================

export interface DualTodoListByTags_todos_pageInfo {
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface DualTodoListByTags_todos_edges_node_tags_edges_node {
  /**
   * The human friendly name of the object.
   */
  name: string | null;
}

export interface DualTodoListByTags_todos_edges_node_tags_edges {
  /**
   * The item at the end of the edge
   */
  node: DualTodoListByTags_todos_edges_node_tags_edges_node | null;
}

export interface DualTodoListByTags_todos_edges_node_tags {
  /**
   * Information to aid in pagination
   */
  edges: (DualTodoListByTags_todos_edges_node_tags_edges | null)[] | null;
}

export interface DualTodoListByTags_todos_edges_node {
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
  /**
   * A collection of todoTags objects
   */
  tags: DualTodoListByTags_todos_edges_node_tags | null;
}

export interface DualTodoListByTags_todos_edges {
  /**
   * The item at the end of the edge
   */
  node: DualTodoListByTags_todos_edges_node | null;
}

export interface DualTodoListByTags_todos {
  /**
   * Information to aid in pagination.
   */
  pageInfo: DualTodoListByTags_todos_pageInfo;
  /**
   * Information to aid in pagination
   */
  edges: (DualTodoListByTags_todos_edges | null)[] | null;
}

export interface DualTodoListByTags_dones_pageInfo {
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface DualTodoListByTags_dones_edges_node_tags_edges_node {
  /**
   * The human friendly name of the object.
   */
  name: string | null;
}

export interface DualTodoListByTags_dones_edges_node_tags_edges {
  /**
   * The item at the end of the edge
   */
  node: DualTodoListByTags_dones_edges_node_tags_edges_node | null;
}

export interface DualTodoListByTags_dones_edges_node_tags {
  /**
   * Information to aid in pagination
   */
  edges: (DualTodoListByTags_dones_edges_node_tags_edges | null)[] | null;
}

export interface DualTodoListByTags_dones_edges_node {
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
  /**
   * A collection of todoTags objects
   */
  tags: DualTodoListByTags_dones_edges_node_tags | null;
}

export interface DualTodoListByTags_dones_edges {
  /**
   * The item at the end of the edge
   */
  node: DualTodoListByTags_dones_edges_node | null;
}

export interface DualTodoListByTags_dones {
  /**
   * Information to aid in pagination.
   */
  pageInfo: DualTodoListByTags_dones_pageInfo;
  /**
   * Information to aid in pagination
   */
  edges: (DualTodoListByTags_dones_edges | null)[] | null;
}

export interface DualTodoListByTags {
  /**
   * A collection of todos objects
   */
  todos: DualTodoListByTags_todos | null;
  /**
   * A collection of todos objects
   */
  dones: DualTodoListByTags_dones | null;
}

export interface DualTodoListByTagsVariables {
  todoTags: string[];
  cursorTodos: string;
  cursorDones: string;
}
