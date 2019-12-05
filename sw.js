/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-sw.js'
);

const precacheManifest = [];

workbox.precaching.precacheAndRoute(precacheManifest);
workbox.googleAnalytics.initialize();

workbox.routing.registerRoute(
  /.*.(?:png|jpg|jpeg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'site-images',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  }),
  'GET'
);

workbox.routing.registerRoute(
  /https:\/\/rsms\.me/,
  new workbox.strategies.CacheFirst({
    cacheName: 'site-fonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  }),
  'GET'
);

workbox.routing.registerRoute(
  /https:\/\/dev\.to\/api\/articles\?username=joshuapbritz/,
  new workbox.strategies.StaleWhileRevalidate({ cacheName: 'site-articles' }),
  'GET'
);


const dataStoreCondig = {
  cacheName: 'engine-data',
};

workbox.routing.registerRoute(
  /.*.(?:js|html|json)$/,
  new workbox.strategies.StaleWhileRevalidate(dataStoreCondig),
  'GET'
);
