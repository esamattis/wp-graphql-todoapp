<?php


$production_bundle = get_template_directory_uri() . '/dist/main.bundle.js';

http_response_code(200);
?>
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://fonts.googleapis.com/css?family=Signika" rel="stylesheet">
    <title>WP GraphQL Todo App</title>
    <style>
    html, body {
        padding: 0;
        margin: 0;
    }
    </style>
</head>

<body>
    <noscript>
        You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
    <script>
        <?php readfile(__DIR__ . '/bootstrap.js'); ?>
    </script>
</body>

</html>