import produce from "immer";

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

interface GQL_PageInfo {
    endCursor: string | null;
}

export interface GQL_Edges {
    /**
     * Information to aid in pagination
     */
    edges: (GQL_Edge | null)[] | null;

    pageInfo: GQL_PageInfo | null;
}

type NotNull<T> = T extends null | undefined ? never : T;
type ArrayValue<T> = T extends (infer V)[] ? NotNull<V> : never;
type NodeProp<T> = T extends {node: infer V} ? NotNull<V> : never;
type EdgesPropValue<T> = T extends {edges: infer V} ? NotNull<V> : never;

type PickByKey<T, K extends keyof T> = NotNull<T[K]>;

export type EdgeNodeType<T, K extends keyof T> = NodeProp<
    ArrayValue<EdgesPropValue<PickByKey<T, K>>>
>;

type PageInfoProp<T> = T extends {pageInfo: infer V} ? NotNull<V> : never;

export type PageInfoType<T, K extends keyof T> = PageInfoProp<PickByKey<T, K>>;

export function getPageInfo<T, K extends keyof T>(data: T, key: K) {
    if (!data) {
        return null;
    }

    const edges = (data as any)[key];

    if (!edges) {
        return;
    }

    return edges.pageInfo as PageInfoType<T, K>;
}

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

    return out as EdgeNodeType<T, K>[];
}

function concatEdges(prev: GQL_Edges, next: GQL_Edges): any {
    return produce(prev as any, (draftPrev: typeof prev) => {
        draftPrev.edges = draftPrev!.edges!.concat(next.edges);

        draftPrev.pageInfo = next.pageInfo;

        if (!draftPrev!.pageInfo!.endCursor) {
            draftPrev!.pageInfo!.endCursor = prev!.pageInfo!.endCursor;
        }

        return draftPrev;
    });
}

export function concatEdgesAtKey<T, K extends keyof T>(
    key: K,
    prev: T,
    next: T,
): T {
    return {
        ...(prev as any),
        [key]: concatEdges(prev[key] as any, next[key] as any),
    };
}
