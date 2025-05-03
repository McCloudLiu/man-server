import { Application } from 'egg';
import type { Server } from 'http';
import ws from 'ws';

export const server = new ws.Server({
  noServer: true,
});

export default (app: Application) => {
  app.on('server', (_server: Server) => {
    _server.on('upgrade', (req, socket, head) => {
      server.handleUpgrade(req, socket, head, () => {});
    });
  });
};
