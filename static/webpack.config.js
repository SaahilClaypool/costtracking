module.exports = {
    watch: true,
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'ify-loader'
            }
        ]
    },
}