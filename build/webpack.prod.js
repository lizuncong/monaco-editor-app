const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');

const prodConfig = {
    mode: 'production',
    output: {
        publicPath: 'https://lizuncong.github.io/monaco-editor-app',
    },
};
const config = merge(baseConfig, prodConfig);
module.exports = config;