const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

const basePath = process.env.NODE_ENV === 'production' ?
  '/en/ultimate-guide-covid19-travel-restrictions-reopening/' : '';
const buildDir = 'dist';

const countries = require('./src/constants/countries.js');
const routes = countries.map((c) => `${basePath}${c.code}.html`);
routes.push(`${basePath}about.html`, basePath);

const productionPlugins = [
  new PrerenderSPAPlugin({
    staticDir: path.join(__dirname, buildDir),
    indexPath: path.join(__dirname, `${buildDir}${basePath}index.html`),
    routes,
    postProcess (renderedRoute) {
      // Ignore any redirects.
      renderedRoute.route = renderedRoute.originalRoute
      // Remove /index.html from the output path if the dir name ends with a .html file extension.
      // For example: /dist/dir/special.html/index.html -> /dist/dir/special.html
      if (renderedRoute.route.endsWith('.html')) {
        renderedRoute.outputPath = path.join(__dirname, buildDir, renderedRoute.route)
      }

      return renderedRoute
    },
    minify: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      decodeEntities: true,
      keepClosingSlash: true,
      sortAttributes: true
    },
    renderer: new Renderer({
      maxConcurrentRoutes: 30,
      renderAfterDocumentEvent: 'render-completed',
    }),
  })
];

module.exports = {
  publicPath: basePath,
  outputDir: `${buildDir}${basePath}`,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(...productionPlugins);
    }
  },
};
