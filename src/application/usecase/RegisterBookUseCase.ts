import BookRepository from '../repository/BookRepository';

export default class RegisterBookUseCase {
  constructor(readonly bookRepository: BookRepository) {}

  async execute(input: Input) {
    const { title, author, isbn, genre, quantity } = input;
    if (!title || !author || !isbn || !genre || !quantity) throw new Error('Invalid input');
    await this.bookRepository.save({ title, author, isbn, genre, quantity });
  }
}

type Input = {
  title: string;
  author: string;
  isbn: string;
  genre: string;
  quantity: number;
};
