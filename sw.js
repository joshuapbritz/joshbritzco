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

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

const dataStoreCondig = {
  cacheName: 'engine-data',
};

workbox.routing.registerRoute(
  /.*.(?:js|html|json)$/,
  new workbox.strategies.StaleWhileRevalidate(dataStoreCondig),
  'GET'
);

/*
    <script>
      (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        (i[r] =
          i[r] ||
          function() {
            (i[r].q = i[r].q || []).push(arguments);
          }),
          (i[r].l = 1 * new Date());
        (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
      })(
        window,
        document,
        'script',
        'https://www.google-analytics.com/analytics.js',
        'ga'
      );
      ga('create', 'UA-97700713-1', 'auto');
    </script>
    <!-- Hotjar Tracking Code for joshbritz.co -->
    <script>
      (function(h, o, t, j, a, r) {
        h.hj =
          h.hj ||
          function() {
            (h.hj.q = h.hj.q || []).push(arguments);
          };
        h._hjSettings = { hjid: 876577, hjsv: 6 };
        a = o.getElementsByTagName('head')[0];
        r = o.createElement('script');
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
      })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
    </script>
*/

/*
export function registerServiceWorker() {
  if (environment.production && 'serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js')
      .then((registration: ServiceWorkerRegistration) => {
        logger.log('Registration successful', registration);

        registration.onupdatefound = () => {
          const installingWorker = registration.installing;

          installingWorker.onstatechange = () => {
            switch (installingWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  logger.log(
                    'New or updated content is available',
                    installingWorker
                  );
                } else {
                  logger.log(
                    'Content is now available offline',
                    installingWorker
                  );
                }
                break;
              case 'redundant':
                logger.log(
                  'The installing service worker became redundant',
                  installingWorker
                );
                break;
              default:
                logger.log(installingWorker.state);
                break;
            }
          };
        };
      })
      .catch(e => logger.error('Error during service worker registration:', e));
  } else if (!environment.production) {
    logger.info('Service Worker not available in development mode');
  } else logger.warn('Service Worker is not supported');
}

*/

// "generate-sw": "workbox injectManifest workbox-config.js",
// "deploy:ci:prod": "firebase deploy --only hosting:prod --token=$FIREBASE_DEPLOY_TOKEN",
// "deploy:ci:staging": "firebase deploy --only hosting:staging --token=$FIREBASE_DEPLOY_TOKEN"

//     "workbox-cli": "^4.3.1"
