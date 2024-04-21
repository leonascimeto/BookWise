import SearchBooksUseCase from '../../application/usecase/SearchBooksUseCase';
import BookSequelizeRepository from '../db/sequelize/repository/BookSequelizeRepository';

export default class SearchBookFactory {
  static create() {
    const bookRepository = new BookSequelizeRepository();
    return new SearchBooksUseCase(bookRepository);
  }
}
