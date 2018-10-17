<?php

require_once __DIR__ . '/dist/entry.php';

$main_bundle = get_template_directory_uri() . '/dist/main.js';

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
    <script data-production-bundle="<?php echo "$main_bundle?$main_hash"; ?>">
        <?php readfile(__DIR__ . '/bootstrap.js'); ?>
    </script>
</body>

</html>
