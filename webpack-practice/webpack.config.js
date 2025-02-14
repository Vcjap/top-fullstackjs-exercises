// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/index.html"],
  },
  plugins: [
    new HtmlWebpackPlugin({ //Constructor call of the htmlwebpack plugin, we pass it the template option
      template: "./src/index.html",
    }),
  ],
  module: { // Handles css
    rules: [ 
      {
        test: /\.css$/i, // If you encounter an imported file ending with css.
        use: ["style-loader", "css-loader"]  // Use these loaders to process it.
      },
      // Webpack will run the loaders starting at the end, 
      // so we want it to read the CSS file into a string with css-loader first, 
      // then use style-loader to inject the JavaScript that applies the CSS in that string to the page. 
      // It wouldn’t work the same the other way round.
      {
        test: /\.html$/i, // If you encounter .html files, use html-loader, which will load images references in the html.
        loader: "html-loader", // for example, the src of an img element.
      },      
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Load images if used in the javascript file (for example, when manipulating the DOM)
        type: "asset/resource",
      }      
    ],
  },
};
// mode: For now, we will just leave this in development mode, as it will be more useful to us. We will revisit this and production mode in a later lesson.
// entry: A file path from the config file to whichever file is our entry point, which in this case is src/index.js.
// output: An object containing information about the output bundle.
// filename: The name of the output bundle - it can be anything you want.
// path: The path to the output directory, in this case, dist. If this directory doesn’t already exist when we run Webpack, it will automatically create it for us as well. Don’t worry too much about why we have the path.resolve part - this is just the way Webpack recommends we specify the output directory.
// clean: If we include this option and set it to true, then each time we run Webpack to bundle, it will empty the output directory first before bundling the files into it. This helps us keep dist clean, so it only contains the files produced by the most recent bundling.
