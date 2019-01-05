/* на всякий случай оставляю зависимости
*  "devDependencies": {
    "awesome-typescript-loader": "3.4.1",
    "typescript": "2.6.2",
    "webpack": "3.10.0",
    "webpack-dev-server": "2.9.7"
  },
*
* также в index.html надо убрать dist, так как output в настройках вебпак виртуальный
* */

module.exports = {
    entry: './src/app.ts',
    output: {
        filename: 'app.js',
        path: __dirname + './dist',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [{ test: /\.ts$/, use: 'awesome-typescript-loader' }],
    },
    devServer: {
        port: 3000,
    },
};
