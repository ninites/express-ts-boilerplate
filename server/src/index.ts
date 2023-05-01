import express from 'express';
import http from 'http';
import cors from 'cors';
import https from 'https';
import fs from 'fs';

import { TestApi } from './api/TestApi';

const APP_CONTAINER_ROOT_PATH = process.env.APP_CONTAINER_ROOT_PATH;

class Server {
  server: express.Application;
  constructor() {
    this.server = express();
    this.server.use(cors());
    this.initRouting();
    this.launch();
  }

  initRouting() {
    new TestApi(this.server);
  }

  launch(): void {
    const httpPort = process.env.HTTP_PORT || 8000;
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
    http.createServer(this.server).listen(httpPort);
    console.log('HTTP SERVER RUNNING on PORT' + httpPort);
  }
}

new Server();
