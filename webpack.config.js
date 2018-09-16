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
        extensions: [".ts", ".tsx", ".js", ".json"],
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
};
