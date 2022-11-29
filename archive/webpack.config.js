const path = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'tmp.js',
        path: path.resolve(__dirname, 'tmp/')
    }
};
