/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddTodo
// ====================================================

export interface AddTodo_createTodo_todo {
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

export interface AddTodo_createTodo {
  clientMutationId: string;
  todo: AddTodo_createTodo_todo | null;
}

export interface AddTodo {
  createTodo: AddTodo_createTodo | null;
}

export interface AddTodoVariables {
  title: string;
}
