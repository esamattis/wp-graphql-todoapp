const {task, parallel} = require("gulp");
const {sh} = require("gulp-sh");

const backendFilesGlob = ["*.php", "*.html", "lib"];

function wrapQuotes(globs) {
    return globs.map(s => `"${s}"`);
}
task(
    "sync-backend-dev",
    sh`
    chokidar ${wrapQuotes(
        backendFilesGlob,
    )} -c 'rsync -Pah  ${backendFilesGlob} git@graphql.valudata-fi.test:sites/graphql/wp-content/themes/wp-graphql-todoapp/ && echo ok'
`,
);
