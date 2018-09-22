/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TodoParts
// ====================================================

export interface TodoParts_tags_edges_node {
  /**
   * The human friendly name of the object.
   */
  name: string | null;
}

export interface TodoParts_tags_edges {
  /**
   * The item at the end of the edge
   */
  node: TodoParts_tags_edges_node | null;
}

export interface TodoParts_tags {
  /**
   * Information to aid in pagination
   */
  edges: (TodoParts_tags_edges | null)[] | null;
}

export interface TodoParts {
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
  tags: TodoParts_tags | null;
}
