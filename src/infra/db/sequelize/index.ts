import { BookEntitySquelize } from './entity/BookEntitySequelize';
import { StudentEntitySequelize } from './entity/StudantEntitySequelize';
import { SequelizeClient } from './SequelizeClient';

const sequelize = SequelizeClient.getInstance();

StudentEntitySequelize.initModel(sequelize);
BookEntitySquelize.initModel(sequelize);

export const dbSequelize = {
  sequelize,
  StudentEntitySequelize,
  BookEntitySquelize,
};
