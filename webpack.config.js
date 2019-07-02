const path = require('path');

module.exports = {
    entry: './src/js/index.js',                 // Path to first JavaScript program file that loads everything else needed by the app.
    output: {                                   // Where output of webpack processing will go.
        filename: 'bundle.js',                  // Any name you want to specify for the bundled code, eg., main.js or bundle.js.
        path: path.resolve(__dirname, 'dist')   // Directory name off root of project where bundle.js will be created. FYI, 'dist' is short for 'distribution'.
    }
};