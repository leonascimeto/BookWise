import { Sequelize } from 'sequelize';

import { SequelizeClient } from '../SequelizeClient';

describe('SequelizeClient', () => {
  test('should return a Sequelize instance', async () => {
    const sequelize = SequelizeClient.getInstance();

    expect(sequelize).toBeDefined();
    expect(sequelize).toBeInstanceOf(Sequelize);
    await expect(sequelize.authenticate()).resolves.toBe(undefined);
  });
});
