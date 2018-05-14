const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: ["./src/app.js"],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: "./public"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }, {
            test: /\.html$/,
            use: [{
                loader: "html-loader"
            }]
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        },{
            test: /\.scss$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
};