const {createWebpackConfig} = require("@epeli/webpack-config");

module.exports = createWebpackConfig({
    hotCors: true,
    emotion: true,
    htmlPlugin: {
        template: "src/entry.php.tmpl",
        filename: "entry.php",
    },
});
