import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import {
  DefinePlugin,
  HotModuleReplacementPlugin,
  ProgressPlugin,
} from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { BuildOptions } from './types/config'

export const buildPlugins = ({ paths, isDev, analyze }: BuildOptions) => {
  const plugins = [
    new ProgressPlugin(),

    new HtmlWebpackPlugin({
      template: paths.html,
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),

    new DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
    }),
  ]

  if (analyze) plugins.push(new BundleAnalyzerPlugin())

  if (isDev)
    plugins.push(
      new ReactRefreshWebpackPlugin(),
      new HotModuleReplacementPlugin()
    )

  return plugins
}
