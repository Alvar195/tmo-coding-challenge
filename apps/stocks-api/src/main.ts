/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
import * as rp from 'request-promise';

import { environment } from './environments/environment';

const chartRequest = (symbol: string, period: string) => {
  try {
    return rp({
      method: 'GET',
      uri: `${environment.apiURL}/beta/stock/${symbol}/chart/${period}?token=${environment.apiKey}`,
      json: true
    });
  } catch (e) {
    return e.message;
  }
};

const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/beta/stock/{symbol}/chart/{period}',
    handler: async (request, h) => {
      const { symbol, period } = request.params;
      return server.methods.chartData(symbol, period);
    }
  });

  server.method('chartData', chartRequest, {
    cache: {
      expiresIn: 120 * 1000,
      generateTimeout: 2000
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

// noinspection JSIgnoredPromiseFromCall
init();
