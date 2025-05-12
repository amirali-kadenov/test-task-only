export type BuildMode = 'production' | 'development'

export interface BuildPaths {
  entry: string
  build: string
  html: string
  src: string
}

export interface BuildOptions {
  mode: BuildMode
  isDev: boolean
  paths: BuildPaths
  port: number
  analyze: boolean
}

export interface BuildEnv {
  mode: BuildMode
  port: number
  analyze: boolean
}
