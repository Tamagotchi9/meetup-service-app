module.exports = {
    devServer: {
        proxy: process.env.API_PROXY_TARGET
    }
}