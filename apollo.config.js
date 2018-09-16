module.exports = {
    schemas: {
        mything: {
            endpoint: {
                url: "http://graphql.valudata-fi.test/graphql",
            },
        },
    },
    queries: [
        // optional if you only have one schema
        {
            schema: "mything", // reference the previously defined schema
            includes: ["**/*.tsx"], // load queries from .tsx files
            excludes: ["node_modules/**"], // don't include any matching files from node_modules
        },
    ],
};
