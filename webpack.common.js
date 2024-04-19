const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = {
    entry: path.resolve(__dirname, "src", "index.js"),
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
        }),
        new MonacoWebpackPlugin({
            features: [
                // Code reading related
                "!codelens", // similar to inlayHints, displays reference counts / VCS info
                "!gotoError", // navigation to coding errors
                "!gotoSymbol", // navigation to symbols
                "!hover", // hover information (like tooltips)
                "!inlayHints", // similar to codelens, displays type / parameter info
                "!parameterHints", // parameter hints in functions/methods
                "!smartSelect", // expand / contract selection based on code structure and syntax

                // Editing related
                "!comment", // add / remove / toggle comments
                "!format", // code formatting
                "!inlineCompletions", // inline code completions
                "!indentation", // auto indentation
                "!inPlaceReplace", // replace code in place
                "!linkedEditing", // simultaneously edit similar text elements (e.g. HTML)
                "!linesOperations", // move / sort lines
                "!multicursor", // multi-cursor simultaneous editing support
                "!rename", // rename refactoring
                "!snippet", // predefined code templates
                "!suggest", // code suggestion

                // Tools
                "!colorPicker", // color picker tool
                "!diffEditor", // diff editor view
                "!inlineProgress", // inline loading progress
            ],
            languages: ["ini"],
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./node_modules/sql.js/dist/sql-wasm.wasm",
                    to: "static/js/",
                },
            ],
        }),
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].[contenthash].bundle.js",
        clean: true,
        publicPath: "auto",
    },
    experiments: {
        asyncWebAssembly: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, "src"),
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                        ],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                ],
            },
            {
                test: /\.ttf$/i,
                type: "asset/resource",
                dependency: {not: ["url"]},
            },
        ],
    },
    resolve: {
        fallback: {
            buffer: require.resolve("buffer/"),
            crypto: require.resolve("crypto-browserify"),
            fs: require.resolve("browserify-fs"),
            path: require.resolve("path-browserify"),
            stream: require.resolve("stream-browserify"),
            vm: false,
        },
        extensions: [
            ".json",
            ".js",
            ".jsx",
        ],
        modules: ["node_modules"],
    },
    optimization: {
        moduleIds: "deterministic",
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },
};
