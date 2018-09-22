/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * List of todoTags to connect the todo to. If an ID is set, it will be used to create the connection. If not, it will look for a slug. If neither are valid existing terms, and the site is configured to allow terms to be created during post mutations, a term will be created using the Name if it exists in the input, then fallback to the slug if it exists.
 */
export interface todoTodoTagsNodes {
  description?: string | null;
  id?: string | null;
  name?: string | null;
  slug?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
