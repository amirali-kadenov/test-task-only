import { Configuration } from 'webpack'
import { buildLoaders } from './build-loaders'
import { buildPlugins } from './build-plugins'
import { buildResolvers } from './build-resolvers'
import { buildWebServer } from './build-web-server'
import { BuildOptions } from './types/config'

export const buildWebpackConfig = (options: BuildOptions): Configuration => {
  const { mode, paths, isDev } = options

  return {
    mode,

    entry: paths.entry,

    module: {
      rules: buildLoaders(options),
    },

    resolve: buildResolvers(options),

    output: {
      filename: 'bundle.js',
      path: paths.build,
      clean: true,
    },

    plugins: buildPlugins(options),

    devtool: isDev ? 'inline-source-map' : undefined,

    devServer: isDev ? buildWebServer(options) : undefined,
  }
}
