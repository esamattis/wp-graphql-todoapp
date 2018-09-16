// XXX: There must be a better way
const IS_JEST = process.argv.join("").includes("jest");

// only for es imports
const nodeSupport = [
    "@babel/preset-env",
    {
        targets: {
            node: "current",
        },
    },
];

let config = {
    presets: ["@babel/preset-typescript", "@babel/preset-react"],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        // "@babel/plugin-syntax-dynamic-import",
    ],
};

if (IS_JEST) {
    config.presets.push(nodeSupport);
}

module.exports = config;
