import {BasicTodoList} from "./components/__generated__/BasicTodoList";

/**
 * Type Guard function for filtering empty values out of arrays.
 *
 * Usage: arr.filter(notEmpty)
 */
export function notEmpty<TValue>(
    value: TValue | null | undefined,
): value is TValue {
    return value !== null && value !== undefined;
}

export interface GQL_Node {}

export interface GQL_Edge {
    /**
     * The item at the end of the edge
     */
    node: GQL_Node | null;
}

export interface GQL_Edges {
    /**
     * Information to aid in pagination
     */
    edges: (GQL_Edge | null)[] | null;
}

interface GQL_Data {
    [key: string]: GQL_Edges | null;
}

type NotNull<T> = T extends null | undefined ? never : T;
type ArrayValue<T> = T extends (infer V)[] ? NotNull<V> : never;
type NodeProp<T> = T extends {node: infer V} ? NotNull<V> : never;
type EdgesPropValue<T> = T extends {edges: infer V} ? NotNull<V> : never;

type PickByKey<T, K extends keyof T> = NotNull<T[K]>;

export type EdgeNode<T, K extends keyof T> = NodeProp<
    ArrayValue<EdgesPropValue<PickByKey<T, K>>>
>;

// export function getEdgeNodes(data: undefined, key: string): [];
export function getEdgeNodes<T, K extends keyof T>(
    data: T,
    key: K,
): EdgeNode<T, K>[] {
    if (!data) {
        return [];
    }

    const foo: GQL_Edges = data[key] as any;

    if (!foo) {
        return [];
    }

    if (!foo.edges) {
        return [];
    }

    const out = foo.edges.map(edge => edge && edge.node).filter(notEmpty);

    return out as EdgeNode<T, K>[];
}
