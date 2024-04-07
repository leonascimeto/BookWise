import Book from '../../domain/entity/Book';
import BookRepository from '../repository/BookRepository';

export default class RegisterBookUseCase {
  constructor(readonly bookRepository: BookRepository) {}

  async execute(input: Input) {
    const { title, author, isbn, genre, quantity } = input;
    if (!title || !author || !isbn || !genre || !quantity) throw new Error('Invalid input');
    const book = Book.build({ title, author, isbn, genre, quantity });
    await this.bookRepository.save(book);
  }
}

type Input = {
  title: string;
  author: string;
  isbn: string;
  genre: string;
  quantity: number;
};
