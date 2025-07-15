//Can be used to merge 2 different webpack config objects
//Helps to merge webpack config from the common file into dev config
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
//Everything inside package.json is parsed and is passed to us as a JSON object
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html',
        }
    },
    plugins: [
        new ModuleFederationPlugin({
           name:'container',
           remotes:{
               marketing: 'marketing@http://localhost:8081/remoteEntry.js'
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
