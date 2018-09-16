/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteTodo
// ====================================================

export interface DeleteTodo_deleteTodo_todo {
  /**
   * Is TODO completed
   */
  completed: boolean | null;
}

export interface DeleteTodo_deleteTodo {
  /**
   * The object before it was deleted
   */
  todo: DeleteTodo_deleteTodo_todo | null;
}

export interface DeleteTodo {
  deleteTodo: DeleteTodo_deleteTodo | null;
}

export interface DeleteTodoVariables {
  id: string;
}
