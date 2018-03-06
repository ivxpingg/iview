var path = require('path');

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, './dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        htmlPath: 'html',
        productionSourceMap: true
    },
    dev: {
        env: require('./dev.env'),
        port: 8880,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        htmlPath: 'html',
        proxyTable: {
            '/metrosupervision': { target: 'http://wechat.doudou360.com', changeOrigin: true }
            // '/metrosupervision': { target: 'http://10.23.120.99:8102', changeOrigin: true }
            // '/metrosupervision/xm': { target: 'http://cs.doudou360.com:8088', changeOrigin: tre },
            // '/metrosupervision/static': { target: 'http://cs.doudou360.com:8088', changeOrigin: true }
            // '/xm': { target: 'http://10.131.1.222:8088', changeOrigin: true }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
