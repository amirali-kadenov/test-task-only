import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import { BuildOptions } from './types/config'

export const buildWebServer = (
  options: BuildOptions
): DevServerConfiguration => ({
  port: options.port,
  open: true,
  historyApiFallback: true,
})
