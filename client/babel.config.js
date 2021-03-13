module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      { useBuiltIns: 'entry', corejs: '2', targets: { node: 'current' } },
    ],
    '@babel/preset-typescript',
  ],
  plugins: ['babel-plugin-transform-import-meta'],
  plugins: [
    function () {
      return {
        visitor: {
          MetaProperty(path) {
            path.replaceWithSourceString('process');
          },
        },
      };
    },
  ],
};
