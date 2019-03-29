const path = require('path')

module.exports = function override(config, env) {
  const isEnvProduction = env === 'production'

  config.module.rules.push({
    test: /\.worker\.(js|mjs|ts)$/,
    include: path.resolve(__dirname, 'src'),
    use: [
      {
        loader: require.resolve('worker-loader'),
        options: {
          inline: true,
        },
      },
      {
        loader: require.resolve('babel-loader'),
        options: {
          customize: require.resolve(
            'babel-preset-react-app/webpack-overrides'
          ),
          babelrc: false,
          configFile: false,
          presets: [require.resolve('babel-preset-react-app')],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          cacheCompression: isEnvProduction,
          compact: isEnvProduction,
        },
      },
    ],
  },)

  config.output.globalObject = 'this'

  return config
}
