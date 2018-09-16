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

type NotNull<T> = T extends null | undefined ? never : T;
type ArrayValue<T> = T extends (infer V)[] ? NotNull<V> : never;
type NodeProp<T> = T extends {node: infer V} ? NotNull<V> : never;
type EdgesPropValue<T> = T extends {edges: infer V} ? NotNull<V> : never;

type PickByKey<T, K extends keyof T> = NotNull<T[K]>;

export type EdgeNode<T, K extends keyof T> = NodeProp<
    ArrayValue<EdgesPropValue<PickByKey<T, K>>>
>;

export function getEdgeNodes<T, K extends keyof T>(data: T, key: K) {
    if (!data) {
        return [];
    }

    const edges: GQL_Edges | null = data[key] as any;

    if (!edges) {
        return [];
    }

    if (!edges.edges) {
        return [];
    }

    const out = edges.edges.map(edge => edge && edge.node).filter(notEmpty);

    return out as EdgeNode<T, K>[];
}
