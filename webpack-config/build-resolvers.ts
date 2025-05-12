import { ResolveOptions } from 'webpack'
import path from 'path'
import { BuildOptions } from './types/config'

export const buildResolvers = (options: BuildOptions): ResolveOptions => ({
  extensions: ['.tsx', '.ts', '.js'],
  modules: [options.paths.src, 'node_modules'],
  mainFiles: ['index'],
  alias: {
    '@': path.resolve(__dirname, options.paths.src),
  },
})
