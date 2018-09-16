// XXX: There must be a better way
const IS_JEST = process.argv.join("").includes("jest");

function addNodeSupport(config) {
    // only for es imports
    config.presets.push([
        "@babel/preset-env",
        {
            targets: {
                node: "current",
            },
        },
    ]);
}

function addModernBrowserSupport(config) {
    config.presets.push([
        "@babel/preset-env",
        {
            // http://browserl.ist/?q=%3E+0.5%25%2C+not+dead%2C+not+samsung+%3C%3D+4%2C+not+android+%3E+0%2C+not+op_mini+%3E+0%2C+not+ie+%3E+0
            targets: [
                "> 0.5%",
                "not dead",
                "not samsung <= 4",
                "not android > 0",
                "not op_mini > 0",
                "not ie > 0 ",
            ],
            // We will transform async functions to generators.
            // It gives  us smaller bundlers and better debugging experience
            exclude: ["transform-regenerator"],
        },
    ]);
    // The generator transform for async functions
    config.plugins.push("@babel/plugin-transform-async-to-generator");
}

let EMOTION_CONFIG = {};

if (process.env.NODE_ENV !== "production") {
    EMOTION_CONFIG = {
        sourceMap: true,
        autoLabel: true,
        labelFormat: "[filename]--[local]",
    };
}

let CONFIG = {
    presets: ["@babel/preset-typescript", "@babel/preset-react"],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        ["emotion", EMOTION_CONFIG],
        // "@babel/plugin-syntax-dynamic-import",
    ],
};

if (IS_JEST) {
    addNodeSupport(CONFIG);
} else {
    addModernBrowserSupport(CONFIG);
}

module.exports = CONFIG;
