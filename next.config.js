// next.config.js
const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

// module.exports = {
//   webpack: (config, options) => {
//     // Fixes npm packages that depend on `fs` module
//     config.node = {
//       fs: 'empty',
//     }

//     return config
//   },
// }

module.exports = withPlugins([
  [
    optimizedImages,
    {
      inlineImageLimit: 1
    }
  ]
]);
