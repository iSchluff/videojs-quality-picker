import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'lib/vjs-quality-picker.js',
    external: ['video.js'],
    output: {
      name: 'videojsQualityPicker',
      file: pkg.browser,
      format: 'umd',
      globals: {
        'video.js': 'videojs'
      }
    },
    plugins: [
      resolve(),
      commonjs()
    ]
  },
  // Commonjs/ES Module build
  {
    input: 'lib/vjs-quality-picker.js',
    external: ['video.js'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  }
];
