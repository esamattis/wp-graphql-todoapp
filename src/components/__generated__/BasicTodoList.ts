/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BasicTodoList
// ====================================================

export interface BasicTodoList_completed_edges_node {
  /**
   * The globally unique ID for the object
   */
  id: string;
  /**
   * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
   */
  title: string | null;
  /**
   * Is TODO completed
   */
  completed: boolean | null;
}

export interface BasicTodoList_completed_edges {
  /**
   * The item at the end of the edge
   */
  node: BasicTodoList_completed_edges_node | null;
}

export interface BasicTodoList_completed {
  /**
   * Information to aid in pagination
   */
  edges: (BasicTodoList_completed_edges | null)[] | null;
}

export interface BasicTodoList_progress_edges_node {
  /**
   * The globally unique ID for the object
   */
  id: string;
  /**
   * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
   */
  title: string | null;
  /**
   * Is TODO completed
   */
  completed: boolean | null;
}

export interface BasicTodoList_progress_edges {
  /**
   * The item at the end of the edge
   */
  node: BasicTodoList_progress_edges_node | null;
}

export interface BasicTodoList_progress {
  /**
   * Information to aid in pagination
   */
  edges: (BasicTodoList_progress_edges | null)[] | null;
}

export interface BasicTodoList {
  /**
   * A collection of todos objects
   */
  completed: BasicTodoList_completed | null;
  /**
   * A collection of todos objects
   */
  progress: BasicTodoList_progress | null;
}
