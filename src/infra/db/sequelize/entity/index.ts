import { SequelizeClient } from '../SequelizeClient';
import { StudentEntitySequelize } from './StudantEntitySequelize';

const sequelize = SequelizeClient.getInstance();

StudentEntitySequelize.initModel(sequelize);

export const dbSequelize = {
  sequelize,
  StudentEntitySequelize,
};
