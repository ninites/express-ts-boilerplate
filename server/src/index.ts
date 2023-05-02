import express from 'express';
import http from 'http';
import cors from 'cors';
import https from 'https';
import fs from 'fs';

import { TestApi } from './api/TestApi';

const APP_CONTAINER_ROOT_PATH = process.env.APP_CONTAINER_ROOT_PATH;

class Server {
  _app: express.Application;
  constructor() {
    this._app = express();
    this._app.use(cors());
    this.initApp();
    this.initServer();
  }

  initApp() {
    new TestApi(this._app);
  }

  initServer(): void {
    if (process.env.NODE_ENV === 'test') {
      return;
    }
    const httpPort = process.env.HTTP_PORT || 8000;
    http.createServer(this._app).listen(httpPort);
    console.log('HTTP SERVER RUNNING on PORT' + httpPort);
    // const httpsPort = process.env.HTTPS_PORT || 8443;

    // const privateKey = fs.readFileSync(
    //   `${APP_CONTAINER_ROOT_PATH}/cert/private.key`
    // );
    // const certificate = fs.readFileSync(
    //   `${APP_CONTAINER_ROOT_PATH}/cert/certificate.crt`
    // );

    // https
    //   .createServer(
    //     {
    //       key: privateKey,
    //       cert: certificate,
    //     },
    //     this.server
    //   )
    //   .listen(httpsPort);
    // console.log('HTTPS SERVER RUNNING on PORT' + httpsPort);
  }

  get app(): express.Application {
    return this._app;
  }
}

const serverInstance = new Server();
const app = serverInstance.app;
export { app };
