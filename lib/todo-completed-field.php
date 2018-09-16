<?php

/**
 * Add "completed" field for the todo
 */
add_filter('graphql_todo_fields', function ($fields) {
    $fields['completed'] = [
        'type' => \WPGraphQL\Types::boolean(),
        'description' => 'Is TODO completed',
        'resolve' => function (\WP_Post $post) {
            $value = get_post_meta($post->ID, 'completed', true);

            if ($value === 'yes') {
                return true;
            }

            return false;
        },
    ];
    return $fields;
});

/**
 * Mutation input for the completed field
 */
add_action(
    'graphql_post_object_mutation_input_fields',
    function ($fields, \WP_Post_Type $post_type_object) {
        if ('todo' === $post_type_object->name) {
            $fields['completed'] = [
                'type' => \WPGraphQL\Types::boolean(),
                'description' => __(
                    'Mutation for TODO completed status',
                    'todo'
                ),
            ];
        }
        return $fields;
    },
    10,
    2
);

/**
 * Actual mutation implementation for the completed field
 */
add_action(
    'graphql_post_object_mutation_update_additional_data',
    function ($post_id, $input, \WP_Post_Type $post_type_object) {
        if ('todo' === $post_type_object->name && isset($input['completed'])) {
            update_post_meta(
                $post_id,
                'completed',

                // save as string for meta query filtering
                $input['completed'] ? "yes" : "no"
            );
        }
    },
    10,
    3
);

/**
 * Query args for filtering lists of TODOs by the completed field
 */
add_filter('graphql_RootTodosQueryArgs_fields', function ($fields) {
    $fields['completed'] = [
        'type' => \WPGraphQL\Types::boolean(),
        'description' => 'Select completed or non completed todos',
    ];

    return $fields;
});

/**
 * Actual implementation of the filtering query arg
 */
add_filter(
    'graphql_map_input_fields_to_wp_query',
    function ($query_args, $args, $source, $all_args, $context, $info) {
        // only manipulate todos input fields
        if ($info->fieldName !== 'todos') {
            return $query_args;
        }

        // No idea why completed appears here too. Just remove it.
        if (isset($query_args['completed'])) {
            unset($query_args['completed']);
        }

        if (!isset($args['completed'])) {
            return $query_args;
        }

        // Convernt completed boolean to meta_query
        $query_args['meta_query'] = [
            [
                'key' => 'completed',
                'compare' => $args['completed'] ? '=' : '!=',
                'value' => 'yes',
            ],
        ];

        // Finally remvoe the completed boolean from the query
        unset($args['completed']);

        return $query_args;
    },
    10,
    6
);
