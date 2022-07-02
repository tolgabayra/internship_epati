const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
        //[chunkhash]: her build için benzersiz bir çıktı
    },
    module: {
        rules:[
            {
                test: /\.js$/,  //->Hangi dosya tiplerinin işlemden geçeceğini belirttiğimiz
                exclude: /(node_modules)/, // -> Hangi klasörlerin işlemden geçmeyeceğini belirtiyoruz

                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },


            {
                test: [/.css$|.scss$|.saas/],
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']

            }


        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: './style.css'
        }),

        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true //import script için .!!
        }),
        new TerserPlugin({
            terserOptions:{
                compress:{
                    drop_console: true,
                }
            }
        })
    ]
}



//clean-webpack-plugin: Her bundle işlemi öncesi belirtilen output klasörünü temizler.