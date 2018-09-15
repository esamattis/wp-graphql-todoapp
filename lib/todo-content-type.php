<?php

add_action('init', function () {
    $error = register_post_type('todo', [
        'labels' => [
            'name' => 'TODO',
            'singular_name' => 'TODOs',
        ],
        'supports' => ['title'],
        'public' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'todo',
        'graphql_plural_name' => 'todos',
    ]);

    if (is_wp_error($error)) {
        throw new Exception('Failed to register todo  type');
    }
});
