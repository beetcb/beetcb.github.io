const path = require('path')

module.exports = {
  entry: './static/entry.js',
  output: {
    path: path.resolve(__dirname, 'dist/static'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192 // in bytes
            }
          }
        ]
      }
    ]
  }
}
