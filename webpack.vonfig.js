const ModuleReplaceWebpackPlugin = require('module-replace-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
    module: {
        rules: [{ test: /\.txt$/, use: 'raw-loader' }],
    },
    plugins: [new webpack.NormalModuleReplacementPlugin(
        /^\/fonts\/mem\.woff2/,
        function (resource) {
            resource.request = resource.request.replace(/^\//, './');
        }
    )],
};