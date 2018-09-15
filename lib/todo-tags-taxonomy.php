<?php

add_action('init', function () {
    register_taxonomy('todotag', 'todo', [
        'label' => __('TODO tag'),
        'public' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'todoTag',
        'graphql_plural_name' => 'todoTags',
        'hierarchical' => true,
    ]);
});
