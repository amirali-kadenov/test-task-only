import { RuleSetRule } from 'webpack'
import { getCssLoader } from './loaders/css-loader'
import { SVG_LOADER } from './loaders/svg-loader'
import { BuildOptions } from './types/config'

export const buildLoaders = ({ isDev }: BuildOptions): RuleSetRule[] => {
  const cssLoader = getCssLoader(isDev)

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }

  const svgLoader = SVG_LOADER

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff|woff2)$/,
    type: 'asset/resource',
  }

  return [fileLoader, svgLoader, typescriptLoader, cssLoader]
}
