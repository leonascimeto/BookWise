import FindPeendingLendsUseCase from '../../application/usecase/FindPeendingLendsUseCase';
import LendSequelizeRepository from '../db/sequelize/repository/LendSequelizeRepository';

export default class FindPeendingLendsFactory {
  static create() {
    const lendRepository = new LendSequelizeRepository();
    return new FindPeendingLendsUseCase(lendRepository);
  }
}
