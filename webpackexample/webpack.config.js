const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')


module.exports = {
    mode : "production",
    // cache: {
    //     type: 'filesystem',
    //     cacheLocation: path.resolve(__dirname, '.test_cache'),
    //     hashAlgorithm: 'md4'

    // },
    entry: { bundle: path.resolve(__dirname, 'src/index.js'), //Taramaya başlanacak dosya adresi
},

    //Projede kullanılan paketlerin ve statik dosyaların nasıl ve nereye çıkartılacağını belirten yer
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename : '[name].js'
    },



    //loader : css, scss,les,png,jpg gibi dosyaların proje içinde kullanmamıza yarcımcı olan js kütühaneleri
    module:{
        rules:[
            {
                test: /\.scss$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.html$/,

            },
            {
                test: /\.(jsx|js)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use:[{
                    loader: 'babel-loader',
                    options: {
                        presets:[
                            ['@babel/preset-env',{
                                "targets": "defaults"
                            }],
                            '@babel/preset-react'
                        ]
                    }
                }]
            }
          
        ]
           
        },
        optimization:{
          minimize: true,
          
          //runtime-bundle.js
          //runtimeChunk: true,
          minimizer: [

            new HtmlMinimizerPlugin(),
            new TerserPlugin({
                //uygulamayı minify ediyor . console logları siliyor
                terserOptions:{
                    compress: {
                        drop_console: true
                    }
                },
            }),
          ],
        },
        //250kb üzerinde bir js file var ise bizr bunu uyarı verir.
         performance: {
             assetFilter: function(assetFilename) {
                 return assetFilename.endsWith('.js');
             },
             hints: 'warning'
         },

        devServer: {
            static : {
                directory: path.join(__dirname, 'public')
            },
            compress: true,
            port: 9000
        },



        //plugin: Loader'ların yapamadığı çoğu şeyi yapan ek js kütüphaneleri 
        //clean-webpack-plugin: Her bundle işlemi öncesi belirtilen output klasörünü temizler.
        //html-webpack-plugin: Normalde bundle işlemi sonrasında webpack html dosyasını aktarmaz. Bu paketi kullanarak her seferinde html dosyasını da oluşturmanızı ve özelleştirmenizi sağlar.
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Webpack App',
                filename: 'index.html',
                template: './dist/index.html'
            }),
        
        ]
    }
