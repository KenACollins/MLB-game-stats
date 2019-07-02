const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'], // Path to first JavaScript program file that loads everything else needed by the app.
    output: {                                   // Where output of webpack processing will go.
        filename: 'bundle.js',                  // Any name you want to specify for the bundled code, eg., main.js or bundle.js.
        path: path.resolve(__dirname, 'dist')   // Directory name off root of project where bundle.js will be created. FYI, 'dist' is short for 'distribution'.
    },
    // watch: true,
    module: {
        rules: [
            {
                test: /\.css$/,                 // Regular expression tells style-loader and css-loader to identify CSS files by .css extension.
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,   // Regular expression tells file-loader to identify image files by various extensions.
                use: [ 'file-loader' ]
            },
            {
                test: /\.m?js$/,                // Regular expression that tells babel-loader to identify JavaScript files by .mjs and .js extensions.
                exclude: /(node_modules|bower_components)/, // Save time by having babel-loader skip JavaScript files in these package directories.
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], // Predetermined configuration defining which new JS features to transpile.
                        cacheDirectory: true    // Babel can be slow. Improve performance via caching files, skipping transpile of every file all the time.
                    }
                }
            }
        ]
    }
};