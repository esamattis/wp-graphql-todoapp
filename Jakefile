const {task} = require("jake");
const {sh} = require("sh-thunk");

const backendFilesGlob = ["*.php", "*.html", "lib", "bootstrap.js"];

function wrapQuotes(globs) {
    return globs.map(s => `"${s}"`);
}

task("js-server", sh`webpack-dev-server --mode development `);

task(
    "js-analyze",
    sh`ANALYZE_BUNDLE=1 NODE_ENV=production webpack --mode production`,
);

// Workaround https://github.com/apollographql/apollo-cli/issues/577
task(
    "generate-graphql-ts",
    sh`
find src/ -type d -name __generated__ | xargs rm -rf
rm -rf ./__generated__
mv node_modules/apollo/node_modules/graphql tmp
apollo codegen:generate --target typescript
mv tmp node_modules/apollo/node_modules/graphql
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
