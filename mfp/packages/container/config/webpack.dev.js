//Can be used to merge 2 different webpack config objects
//Helps to merge webpack config from the common file into dev config
const {merge} = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
//Everything inside package.json is parsed and is passed to us as a JSON object
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    output:{
        publicPath: 'http://localhost:8080/',
    },
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: '/index.html',
        }
    },
    plugins: [
        new ModuleFederationPlugin({
           name:'container',
           remotes:{
               marketing: 'marketing@http://localhost:8081/remoteEntry.js',
               auth: 'auth@http://localhost:8082/remoteEntry.js',
           },
            //shared: ['react', 'react-dom'],
            shared: packageJson.dependencies,
        }),
    ]
};

//export the merge of common config and devConfig
module.exports = merge(commonConfig, devConfig)
