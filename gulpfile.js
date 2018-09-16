const {task, parallel} = require("gulp");
const {sh} = require("gulp-sh");

const backendFilesGlob = ["*.php", "*.html", "lib", "bootstrap.js"];

function wrapQuotes(globs) {
    return globs.map(s => `"${s}"`);
}

task("js-server", sh`webpack-dev-server --mode development `);

task("generate-graphql-ts", sh`apollo codegen:generate --target typescript`);

task(
    "clear-generated-ts",
    sh`
    find src/ -type d -name __generated__ | xargs rm -rf
    rm -rf ./__generated__
`,
);

task(
    "sync-backend-dev",
    sh`
    chokidar ${wrapQuotes(
        backendFilesGlob,
    )} -c 'rsync -Pah  ${backendFilesGlob} git@graphql.valudata-fi.test:sites/graphql/wp-content/themes/wp-graphql-todoapp/ && echo ok'
`,
);
