require! <[bower-webpack-plugin extract-text-webpack-plugin nib path webpack webpack-bundle-tracker]>

module.exports =
  context: __dirname,
  entry:
    main: <[./app/main.ls]>
  module:
    loaders: # https://webpack.github.io/docs/configuration.html#module-loaders
      * test: /\.(jade|pug)$/ loader: \jade
      * test: /\.json$/ loader: \json
      * test: /\.ls$/ loader: \livescript
      * test: /\/res\/image\// loader: \url?limit=10000
      * test: /\.styl$/ loader: extract-text-webpack-plugin.extract 'style' 'css!stylus'
      * test: /\.css$/ loader: extract-text-webpack-plugin.extract 'style' 'css'
      * test: /\.(eot|ico|jpg|mp3|svg|ttf|woff2|woff|png?)($|\?)/ loader: \file
  output:
    filename: '[name].js'
    path: __dirname + \/dist
    public-path: \/dist/
  plugins: # Additional plugins. ref: https://github.com/webpack/docs/wiki/list-of-plugins
    * new webpack.optimize.OccurenceOrderPlugin!
    * new webpack.NoErrorsPlugin!
    * new webpack.Provide-plugin $: \jquery jQuery: \jquery
    * new bower-webpack-plugin search-resolve-modules-directories: false
    * new extract-text-webpack-plugin '[name].css' # ref: https://webpack.github.io/docs/stylesheets.html#all-styles-in-separate-css-output-file
    * new webpack-bundle-tracker filename: \./webpack-stats.json
  resolve: # options for resolving module
    alias: # module alias
      jquery: \jquery/dist/jquery.min.js
    modules-directories: <[app node_modules]> # directories that webpack search for modules
  stylus: # stylus loader config. ref: https://github.com/shama/stylus-loader
    import: <[~nib/lib/nib/index.styl]>
    use: [nib!]

# vi:et:sw=2:sts=2
