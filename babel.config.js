module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@action': './src/store/action',
          '@api': './src/api',
          '@screen': './src/component/screen',
          '@container': './src/component/container',
          '@view': './src/component/view',
          '@navigator': './src/component/navigator',
          '@hook': './src/hook',
          '@modal': './src/modal',
          '@reducer': './src/store/reducer',
          '@resource': './src/resource',
          '@store': './src/store',
          '@uikit': './src/uikit',
          '@utils': './src/utils',
          '@module': './src/module',
          '@service': './src/service',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
