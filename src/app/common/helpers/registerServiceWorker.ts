import { environment } from 'src/environments/environment';

// Credits Mike Geyser [https://github.com/mikegeyser].
// From project [https://github.com/mikegeyser/building-pwas-with-angular].
export function registerServiceWorker() {
  const prefix = [
    '%cAngular',
    `background: red; color: white; padding: 2px 0.5em; ` +
      `border-radius: 0.5em;`,
  ];

  if (environment.production && 'serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js')
      .then(registration => {
        console.log(...prefix, 'Registration successful', registration);
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          installingWorker.onstatechange = () => {
            switch (installingWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  console.log(
                    ...prefix,
                    'New or updated content is available',
                    installingWorker
                  );
                } else {
                  console.log(
                    ...prefix,
                    'Content is now available offline',
                    installingWorker
                  );
                }
                break;
              case 'redundant':
                console.error(
                  ...prefix,
                  'The installing service worker became redundant',
                  installingWorker
                );
                break;
              default:
                console.log(...prefix, installingWorker.state);
                break;
            }
          };
        };
      })
      .catch(e => {
        console.error(
          ...prefix,
          'Error during service worker registration:',
          e
        );
      });
  } else {
    console.warn(...prefix, 'Service Worker is not supported');
  }
}
