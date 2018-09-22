const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");

module.exports = {
    entry: {
        main: "./src/index.tsx",
    },
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist",
        publicPath: "/dist",
    },

    // devServer: {
    //     contentBase: __dirname + "/dist",
    // },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".mjs", ".js", ".json"],
    },

    module: {
        rules: [
            {test: /\.(ts|tsx|js)$/, loader: "babel-loader"},
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },

    plugins: [process.env.ANALYZE_BUNDLE && new BundleAnalyzerPlugin()].filter(
        Boolean,
    ),
};
