const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [
            //Loader tells Webpack to process some different files as we start to import them to our project
            //First loader we use is Babel, which is in charge of processing all code from ES2015,16,17,etc to regular ES5 code
            //which can easily be executed inside a typical browser
            {
                //Process all mjs and js files by babel
                test: /\.m?js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader',
                    options: {
                        //babel will process all JSX tags
                        presets: ['@babel/preset-react','@babel/preset-env'],
                        //Add in some code to enable some additional features like async/await syntax
                        plugins:['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ]
}