let mix = require('laravel-mix');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminOptipng = require('imagemin-optipng');
const imageminPngquant = require('imagemin-pngquant');


require('laravel-mix-bundle-analyzer');

if (!mix.inProduction()) {
    mix.bundleAnalyzer();
}

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

// mix.webpackConfig({
//     module: {
//         rules: [{
//             test: /\.(gif|png|jpe?g|svg)$/i,
//             use: [
//                 {
//                     loader: 'file-loader',
//                     options: {
//                         name(resourcePath, resourceQuery) {
//                             // `resourcePath` - `/absolute/path/to/file.js`
//                             // `resourceQuery` - `?foo=bar`
//
//                             // if (process.env.NODE_ENV === 'development') {
//                             return '[name].[ext]';
//                             // }
//
//                             // return '[contenthash].[ext]';
//                         },
//                         outputPath: 'images/'
//                     }
//                 },
//                 {
//                     loader: 'image-webpack-loader',
//                     options: {
//                         bypassOnDebug: true, // webpack@1.x
//                         mozjpeg: {
//                             progressive: true,
//                             quality: 10
//                         },
//                         // optipng.enabled: false will disable optipng
//                         optipng: {
//                             enabled: false,
//                         },
//                         pngquant: {
//                             quality: [0.65, 0.90],
//                             speed: 4
//                         },
//                         gifsicle: {
//                             interlaced: false,
//                         },
//                         // the webp option will enable WEBP
//                         webp: {
//                             quality: 75
//                         },
//                     }
//                 },
//             ],
//         }],
//     },
// });



mix.babelConfig({
    plugins: ['@babel/plugin-syntax-dynamic-import'],
});

mix.setPublicPath('public/');
mix.js('resources/js/app.js', 'js/')
    .extract(['jquery', 'popper.js'], 'js/jpop')
    .extract(['bootstrap'], 'js/bootstrap')
    .extract(['vue', 'axios','vue-router', 'vuex'], 'js/vendor');

// mix.sass('resources/scss/app.scss', 'public/css');

mix.webpackConfig({
    resolve: {
        alias: {
            '@': __dirname + '/resources/js'
        },
    },
});






mix.config.webpackConfig.output = {
    chunkFilename: 'js/[name].bundle.js',
}


//
// mix.copy('resources/js/images', 'public/images');
//








if (!mix.isWatching()) {
    mix.webpackConfig({
        // module: {
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'resources/js/images',
                        to: 'images', // Laravel mix will place this in 'public/img'
                    }
                ]
            }),
            new ImageminPlugin({
                test: /\.(jpe?g|png|gif|svg)$/i,
                plugins: [
                    imageminMozjpeg({
                        quality: 20,
                    }),
                    imageminOptipng(),
                    imageminPngquant()
                ]
            })
        ]
        // }
    });
}

if (mix.inProduction()) {
    mix.options({
        terser: {
            terserOptions: {
                compress: {
                    drop_console: true
                }
            }
        }
    });

    mix.version();
}

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.preact(src, output); <-- Identical to mix.js(), but registers Preact compilation.
// mix.coffee(src, output); <-- Identical to mix.js(), but registers CoffeeScript compilation.
// mix.ts(src, output); <-- TypeScript support. Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.test');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Mix's default.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.override(function (webpackConfig) {}) <-- Will be triggered once the webpack config object has been fully generated by Mix.
// mix.dump(); <-- Dump the generated webpack config object to the console.
// mix.extend(name, handler) <-- Extend Mix's API with your own components.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   terser: {}, // Terser-specific options. https://github.com/webpack-contrib/terser-webpack-plugin#options
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
