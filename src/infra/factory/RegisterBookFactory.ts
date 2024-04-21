import RegisterBookUseCase from '../../application/usecase/RegisterBookUseCase';
import BookSequelizeRepository from '../db/sequelize/repository/BookSequelizeRepository';

export default class RegisterBookFactory {
  static create() {
    const bookRepository = new BookSequelizeRepository();
    return new RegisterBookUseCase(bookRepository);
  }
}
