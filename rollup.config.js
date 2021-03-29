import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import typescript from 'rollup-plugin-typescript2'
import css from 'rollup-plugin-css-only'
import uglify from 'rollup-plugin-uglify-es'

import packageJson from './package.json'

export default {
  input: './src/index.ts',
  output: [
    {
      file: packageJson.module,
      format: "esm"
    },
    {
      file: packageJson.main,
      format: 'cjs'
    }
  ],
  external: Object.keys(packageJson.devDependencies),
  cache: false,
  plugins: [peerDepsExternal(), resolve({
    preferBuiltins: false,
    main: true,
    browser: true
  }), commonjs(), typescript({
    tsconfig: './tsconfig.json',
    clean: true
  }),
  uglify(),
  css({ output: 'bundle.css' })
  ]
}
