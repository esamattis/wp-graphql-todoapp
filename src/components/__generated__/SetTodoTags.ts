/* tslint:disable */
// This file was automatically generated and should not be edited.

import { todoTodoTagsNodes } from "./..\\..\\..\\__generated__\\globalTypes";

// ====================================================
// GraphQL mutation operation: SetTodoTags
// ====================================================

export interface SetTodoTags_updateTodo_todo {
  /**
   * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
   */
  title: string | null;
}

export interface SetTodoTags_updateTodo {
  todo: SetTodoTags_updateTodo_todo | null;
}

export interface SetTodoTags {
  updateTodo: SetTodoTags_updateTodo | null;
}

export interface SetTodoTagsVariables {
  nodes: todoTodoTagsNodes[];
}
