const {VueLoaderPlugin} = require('vue-loader');

module.exports = {
    entry: './src/index.js',
    output: {
        filename:'[name].[contenthash].js',
    },
    resolve: {
        extensions: ['.js','.vue'],
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg|ttf|woff|eot)$/i,
                use:[
                    {loader: 'file-loader'},
                ]
            },
            {
              test : /\.vue$/,
              use: 'vue-loader'
            },
            // Separate rule for CSS files
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
            // Separate rule for SCSS files
            {
                test: /\.scss$/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader']
            },

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
                        presets: ['@babel/preset-env'],
                        //Add in some code to enable some additional features like async/await syntax
                        plugins:['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },
    plugins: [new VueLoaderPlugin()],
}