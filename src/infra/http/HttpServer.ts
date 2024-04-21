import express, { Router } from 'express';

import routes from './routes';

export default class HttpServer {
  readonly PORT = process.env.PORT || 3000;
  app = express();

  constructor() {
    this.app.use(express.json());
    this.addRoutes(routes);
  }

  private addRoutes(routes: Router) {
    this.app.use(routes);
  }

  listen() {
    this.app.listen(this.PORT, () => console.log(`Server is running at http://localhost:${this.PORT}`));
  }
}
