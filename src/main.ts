import { dbSequelize } from './infra/db/sequelize';
import HttpServer from './infra/http/HttpServer';

async function main() {
  await dbSequelize.sequelize.sync();

  const httpServer = new HttpServer();
  httpServer.listen();
}

main();
