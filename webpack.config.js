const {createWebpackConfig} = require("@epeli/webpack-config");

module.exports = createWebpackConfig({hotCors: true, htmlPlugin: {
    template: "src/entry.php.tmpl",
    filename: "entry.php"
}});
