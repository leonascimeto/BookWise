import RegisterBookUseCase from '../RegisterBookUseCase';

describe('RegisterBookUseCase', () => {
  const bookRepository = {
    save: jest.fn(),
    search: jest.fn(),
    findById: jest.fn(),
    existsISBN: jest.fn(),
  };

  const book = {
    title: 'title',
    author: 'author',
    isbn: 'isbn',
    genre: 'genre',
    quantity: 1,
  };

  test('should register a a book', async () => {
    bookRepository.existsISBN.mockResolvedValue(false);
    const sut = new RegisterBookUseCase(bookRepository);

    expect(await sut.execute(book)).toBeUndefined();
    expect(bookRepository.save).toHaveBeenCalledWith(expect.objectContaining(book));
    expect(bookRepository.save).toHaveBeenCalledTimes(1);
  });

  test('should throw an error when ISBN already exists', async () => {
    bookRepository.existsISBN.mockResolvedValue(true);
    const sut = new RegisterBookUseCase(bookRepository);

    await expect(sut.execute(book)).rejects.toThrow('ISBN already exists');
  });

  test.each([
    { title: '', author: 'author', isbn: 'isbn', genre: 'genre', quantity: 1 },
    { title: 'title', author: '', isbn: 'isbn', genre: 'genre', quantity: 1 },
    { title: 'title', author: 'author', isbn: '', genre: 'genre', quantity: 1 },
    { title: 'title', author: 'author', isbn: 'isbn', genre: '', quantity: 1 },
    { title: 'title', author: 'author', isbn: 'isbn', genre: 'genre', quantity: 0 },
  ])('should throw an error when input is invalid', async payload => {
    bookRepository.existsISBN.mockResolvedValue(false);
    const sut = new RegisterBookUseCase(bookRepository);

    await expect(sut.execute(payload)).rejects.toThrow('Invalid input');
  });
});
