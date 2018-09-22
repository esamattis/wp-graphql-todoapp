/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetTodoCompletion
// ====================================================

export interface SetTodoCompletion_updateTodo_todo {
  /**
   * The globally unique ID for the object
   */
  id: string;
  /**
   * Is TODO completed
   */
  completed: boolean | null;
}

export interface SetTodoCompletion_updateTodo {
  todo: SetTodoCompletion_updateTodo_todo | null;
}

export interface SetTodoCompletion {
  updateTodo: SetTodoCompletion_updateTodo | null;
}

export interface SetTodoCompletionVariables {
  id: string;
  completed: boolean;
}
