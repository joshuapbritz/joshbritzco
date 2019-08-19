import { environment } from 'src/environments/environment';
import { Logger } from './logger';

const logger: Logger = new Logger('Angular', ['red', 'white']);

// Credits Mike Geyser [https://github.com/mikegeyser].
// From project [https://github.com/mikegeyser/building-pwas-with-angular].
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
