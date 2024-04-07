import BookRepository from '../repository/BookRepository';

export default class SearchBooksUseCase {
  constructor(readonly bookRepository: BookRepository) {}

  async execute(input: Input) {
    const { value } = input;
    if (!value) throw new Error('Invalid input');
    return await this.bookRepository.search(value);
  }
}

type Input = {
  value: string;
};
