import LendBookUseCase from '../../application/usecase/LendBookUseCase';
import BanListSequelizeRepository from '../db/sequelize/repository/BanListSequelizeRepository';
import BookSequelizeRepository from '../db/sequelize/repository/BookSequelizeRepository';
import LendSequelizeRepository from '../db/sequelize/repository/LendSequelizeRepository';
import StudentSequelizeRepository from '../db/sequelize/repository/StudentSequelizeRepository';

export default class LendBookFactory {
  static create() {
    const lendRepository = new LendSequelizeRepository();
    const banListRepository = new BanListSequelizeRepository();
    const studentRepository = new StudentSequelizeRepository();
    const bookRepository = new BookSequelizeRepository();
    return new LendBookUseCase(bookRepository, studentRepository, lendRepository, banListRepository);
  }
}
