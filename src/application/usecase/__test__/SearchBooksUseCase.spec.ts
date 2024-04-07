import SearchBooksUseCase from '../SearchBooksUseCase';

describe('SearchBooksUseCase', () => {
  const bookRepository = {
    search: jest.fn(),
    save: jest.fn(),
    findById: jest.fn(),
  };

  const input = {
    value: 'search',
  };

  const books = [
    {
      title: 'title',
      author: 'author',
      isbn: 'isbn',
      genre: 'genre',
      quantity: 1,
    },
    {
      title: 'title2',
      author: 'author2',
      isbn: 'isbn2',
      genre: 'genre2',
      quantity: 2,
    },
  ];

  test('should search for books', async () => {
    bookRepository.search.mockResolvedValue(books);
    const sut = new SearchBooksUseCase(bookRepository);

    expect(await sut.execute(input)).toHaveLength(2);
    expect(bookRepository.search).toHaveBeenCalledWith(input.value);
    expect(bookRepository.search).toHaveBeenCalledTimes(1);
  });

  test('should throw an error when input is invalid', async () => {
    const sut = new SearchBooksUseCase(bookRepository);

    await expect(sut.execute({ value: '' })).rejects.toThrow('Invalid input');
  });
});
