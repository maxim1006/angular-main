'use strict';

const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');


// https://webpack.js.org/plugins/context-replacement-plugin/
module.exports = {
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-gb/),
        // если хочу включить авто компрессию, но для этого надо настроить сервер
        // https://medium.com/@selvaganesh93/how-to-serve-webpack-gzipped-file-in-production-using-nginx-692eadbb9f1c
        // new CompressionPlugin({
        //     filename: '[path].gz[query]'
        // }),
        // Добавляю файл для версий
        new webpack.DefinePlugin({
            "VERSION": JSON.stringify("4711")
        })
    ]
};

// так использую версии
// import { Component } from '@angular/core';
//
// declare const VERSION: string;
//
// @Component({
//     selector: 'app-root',
//     templateUrl: './app.component.html',
//     styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//     title = 'Version: ' + VERSION;
// }
