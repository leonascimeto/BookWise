import RefundBookUseCase from '../../application/usecase/RefundBookUseCase';
import BanListSequelizeRepository from '../db/sequelize/repository/BanListSequelizeRepository';
import LendSequelizeRepository from '../db/sequelize/repository/LendSequelizeRepository';
import StudentSequelizeRepository from '../db/sequelize/repository/StudentSequelizeRepository';

export default class RefundBookFactory {
  static create() {
    const lendRepository = new LendSequelizeRepository();
    const banListRepository = new BanListSequelizeRepository();
    const studentRepository = new StudentSequelizeRepository();
    return new RefundBookUseCase(studentRepository, lendRepository, banListRepository);
  }
}
