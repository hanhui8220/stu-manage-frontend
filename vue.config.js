module.exports = {
    devServer: {
        open: false,
        port: 8080,
        https: false,
        proxy: {
            'api': {
                target: 'http://localhost:8081/',
                ws: true,  //开启跨域
                changeOrigin: true,
                pathRewrite: {
                    '^/api':''
                }
            }
        }
    },
};

