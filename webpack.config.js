const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development',
	// エントリーポイントの設定
	entry: path.join(__dirname, 'src', 'javascript', 'main.js'),
	// 出力の設定
	output: {
		// 出力するファイル名
		filename: 'bundle.js',
		// 出力先のパス（絶対パスを指定する必要がある）
		path: path.join(__dirname, 'dist'),
		// publicPath: path.join(__dirname, 'dist')
	},
	devServer: {
		open: true,
		inline: true,
		contentBase: path.join(__dirname, 'src'),
		// publicPath: '/dist',
		watchContentBase: true,
		port: 3000
	},
	module: {
		rules: [{
				test: /\.js[x]?$/,
				exclude: /node_modules/,
				// loader: "babel-loader"
			},
			{
				test: /\.html$/,
				loader: "html-loader"
			},
			{
				test: /\.css/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							url: false
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'html', 'index.html')
		})
	]
};