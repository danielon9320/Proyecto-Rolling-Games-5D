const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './src/js/index.js',
        admin: './src/js/admin.js',
        juego: './src/js/juego.js',
        RPGS: './src/js/RPGS.js',
        contacto: './src/js/contacto.js',
        futbol: './src/js/futbol.js',
        carreras: './src/js/carreras.js',
        online: './src/js/online.js',
        sobreNos: './src/js/sobreNos.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[ext]',
                     },
                  },
                ],
              },        
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject:true,
            chunks: ['index'],
            filename:'./index.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/admin.html',
            inject:true,
            chunks: ['admin'],
            filename:'./admin.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/e404.html',
            inject:true,
            chunks: ['e404'],
            filename:'./e404.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/RPGS.html',
            inject:true,
            chunks: ['RPGS'],
            filename:'./RPGS.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/sobreNos.html',
            inject:true,
            chunks: ['sobreNos'],
            filename:'./sobreNos.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/contacto.html',
            inject:true,
            chunks: ['contacto'],
            filename:'./contacto.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/futbol.html',
            inject:true,
            chunks: ['futbol'],
            filename:'./futbol.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/carreras.html',
            inject:true,
            chunks: ['carreras'],
            filename:'./carreras.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/online.html',
            inject:true,
            chunks: ['online'],
            filename:'./online.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
              {
                from: './src/img',
                to: 'img',
              },
             
            ]
        })
    ],
};

