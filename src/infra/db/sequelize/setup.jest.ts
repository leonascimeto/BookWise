import { dbSequelize } from './entity';

beforeAll(async () => {
  await dbSequelize.sequelize.sync({ force: true });
});

afterAll(async () => {
  await dbSequelize.sequelize.drop();
  await dbSequelize.sequelize.close();
});
