const path = require('path');
const fs = require('fs');
exports.getStyleLoaders = (mode, cssOptions, preProcessor, preProcessorOptions) => {
  const loaders = [
    'style-loader',
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: 'postcss-loader',
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: preProcessor,
        options: { sourceMap: true, ...preProcessorOptions },
      },
    );
  }
  return loaders;
};