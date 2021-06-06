const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
    entry: {
        index: "./assets/js/index.js",
        db:"./assets/js/db.js"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js",
    },
    //! production or development?
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
    plugins: [
        new WebpackPwaManifest({
            fingerprints: false,
            name: "Budget Tracker",
            short_name: "Budget",
            description:
                "An application that able to track my withdrawals and deposits with or without a data/internet connection.",
            background_color: "#01579b",
            //! two theme colors?
            theme_color: "#ffffff",
            "theme-color": "#ffffff",
            start_url: "/",
            icons: [
                {
                    src: path.resolve("assets/icons/icon-192x192.png"),
                    sizes: [96, 128, 192, 256, 384, 512],
                    destination: path.join("assets", "icons"),
                },
                {
                    src: path.resolve("assets/icons/icon-512x512.png"),
                    sizes: [96, 128, 192, 256, 384, 512],
                    destination: path.join("assets", "icons"),
                }
            ],
        }),
    ],
};

module.exports = config;
