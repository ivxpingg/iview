process.env.NODE_ENV = 'production';

var rm = require('rimraf');
var path = require('path');
var webpack = require('webpack');
var config = require('../config');
var webpackConfig = require('./webpack.prod.config');
var shell = require('shelljs');


rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err

    shell.rm('-rf', path.join(__dirname, '../dist/*'));
    shell.mkdir('-p', path.join(__dirname, '../dist/static'));
    shell.mkdir('-p', path.join(__dirname, '../dist/html'));
    shell.cp('-R', path.join(__dirname, '../src/static/*'), path.join(__dirname, '../dist/static'));
    shell.cp('-R', path.join(__dirname, '../src/html/*'), path.join(__dirname, '../dist/html'));
  webpack(webpackConfig, function (err, stats) {
    //spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    // console.log(chalk.cyan('  Build complete.\n'))
    // console.log(chalk.yellow(
    //   '  Tip: built files are meant to be served over an HTTP server.\n' +
    //   '  Opening index.html over file:// won\'t work.\n'
    // ))
  })
})
