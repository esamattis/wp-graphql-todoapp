/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllTags
// ====================================================

export interface GetAllTags_todoTags_edges_node {
  /**
   * The global ID for the todotag
   */
  id: string;
  /**
   * The human friendly name of the object.
   */
  name: string | null;
}

export interface GetAllTags_todoTags_edges {
  /**
   * The item at the end of the edge
   */
  node: GetAllTags_todoTags_edges_node | null;
}

export interface GetAllTags_todoTags {
  /**
   * Information to aid in pagination
   */
  edges: (GetAllTags_todoTags_edges | null)[] | null;
}

export interface GetAllTags {
  /**
   * A collection of todoTags objects
   */
  todoTags: GetAllTags_todoTags | null;
}
