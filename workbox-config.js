module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{ico,html,js,css,svg,jpg,jpeg,png,json,txt}'],
  swSrc: 'src/sw.js',
  swDest: 'dist/sw.js',
  injectionPointRegexp: /(const precacheManifest = )\[\](;)/,
};
