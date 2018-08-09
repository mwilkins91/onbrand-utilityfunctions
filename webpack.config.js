const { resolve } = require('path');
const autoprefixer = require('autoprefixer');
const calc = require('postcss-calc');
const cssnano = require('cssnano');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const Logger = require('node-color-logger');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const logger = new Logger('white');

// -- Start Webpack Code -- //

// LOADER *RULE* - JS
const javascript = {
  test: /\.(js)$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['env', 'stage-1'],
      },
    },
  ],
};

// LOADER *RULES* - CSS/SASS
const postcss = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    plugins() {
      return [
        autoprefixer({
          browsers: 'last 3 versions',
        }),
        calc(), // turns calc(10px + 20px) to 30px... optimization
        cssnano({
          zindex: false,
          minifyFontValues: false,
          discardUnused: false,
          normalizeUrl: false,
        }), // minifiy
      ];
    },
  },
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
  },
};

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
  },
};

const styles = {
  test: /\.(scss)$/,
  use: [cssLoader, postcss, sassLoader],
};

// LOADER *RULES* - FONT
const fonts = {
  test: /\.(eot|ttf|woff|woff2)$/,
  loader: 'file-loader?name=fonts/[name].[ext]',
};

// LOADER *RULES* - HTML
const html = {
  test: /\.(html)$/,
  use: [
    {
      loader: 'html-loader',
      options: {},
    },
  ],
};

// LOADER *RULES* - Images
const images = {
  test: /\.(png|jpg|gif|svg)$/,
  use: [
    {
      loader: 'file-loader?name=images/[name].[ext]',
    },
  ],
};


// The Final Module Export
module.exports = [
  {
    /**
     * Core utility modules build
     */
    context: resolve(__dirname),
    entry: './index.js',
    output: {
      path: resolve(__dirname, 'build'),
      filename: 'onbrandUtilityFunctions.bundle.js',
      library: 'onbrandUtilityFunctions',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    mode: 'production',
    devtool: 'source-map',
    module: {
      rules: [javascript, styles, html, images, fonts],
    },
    plugins: [
      new WebpackBuildNotifierPlugin({
        title: 'MarkBot',
        suppressWarning: true,
        suppressSuccess: false,
        messageFormatter(obj, string) {
          logger.changeColorTo('white').log(obj, string);
          return `Hey Onbrander! Wepack hit an error in ${string}. Check the terminal for details!`;
        },
      }),
      new UglifyJSPlugin({
        sourceMap: true,
      }),
    ],
    watch: false,
    stats: {
      children: false,
    },
  },
  {
    /**
     * Conditional-babel build
     */
    context: resolve(__dirname),
    entry: './conditional-babel-polyfill.js',
    output: {
      path: resolve(__dirname, 'build'),
      filename: 'conditional-babel-polyfill.bundle.js',
      library: 'conditional-babel-polyfill',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    mode: 'production',
    devtool: 'source-map',
    module: {
      rules: [javascript],
    },
    plugins: [
      new UglifyJSPlugin({
        sourceMap: true,
      }),
    ],
    watch: false,
  },
];

