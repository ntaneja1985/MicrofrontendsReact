//Can be used to merge 2 different webpack config objects
//Helps to merge webpack config from the common file into dev config
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');


const devConfig = {
    mode: 'development',
    output:{
        publicPath: 'http://localhost:8081/',
    },
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: '/index.html',
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
            //shared: ['react', 'react-dom'],
            shared: packageJson.dependencies,
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        })
    ]
};

//export the merge of common config and devConfig
module.exports = merge(commonConfig, devConfig)
