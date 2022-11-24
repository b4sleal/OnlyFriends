const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: path.join(__dirname, 'src', 'client', 'index.js'),
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(s[ac]ss|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                        }
                    }
                ]
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[hash]-[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", '.svg']
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js",
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html")
        }),
        new NodePolyfillPlugin()
    ],
    devServer: {
        static: path.resolve(__dirname, "./public"),
        historyApiFallback: true,
        port: 3000
    },
};