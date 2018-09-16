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

export interface GQL_Result {
    /**
     * Information to aid in pagination
     */
    edges: (GQL_Edge | null)[] | null;
}

type NotNull<T> = T extends null ? never : T;
type ArrayValue<T> = T extends (infer V)[] ? NotNull<V> : never;
type NodeProp<T> = T extends {node: infer T} ? NotNull<T> : never;

type EdgeNode<T extends GQL_Result | null> = T extends {edges: infer A}
    ? NodeProp<ArrayValue<NotNull<A>>>
    : never;

export function getEdgeNodes<T extends GQL_Result | null>(
    res: T,
): EdgeNode<T>[] {
    if (!res) {
        return [];
    }

    if (!res.edges) {
        return [];
    }

    const out = res.edges.map(edge => edge && edge.node).filter(notEmpty);

    return out as EdgeNode<T>;
}
