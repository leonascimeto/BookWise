import RegisterBookUseCase from '../RegisterBookUseCase';

describe('RegisterBookUseCase', () => {
  const bookRepository = {
    save: jest.fn(),
    search: jest.fn(),
    findById: jest.fn(),
  };

  const book = {
    title: 'title',
    author: 'author',
    isbn: 'isbn',
    genre: 'genre',
    quantity: 1,
  };

  test('should register a a book', async () => {
    const sut = new RegisterBookUseCase(bookRepository);

    expect(await sut.execute(book)).toBeUndefined();
    expect(bookRepository.save).toHaveBeenCalledWith(expect.objectContaining(book));
    expect(bookRepository.save).toHaveBeenCalledTimes(1);
  });

  test.each([
    { title: '', author: 'author', isbn: 'isbn', genre: 'genre', quantity: 1 },
    { title: 'title', author: '', isbn: 'isbn', genre: 'genre', quantity: 1 },
    { title: 'title', author: 'author', isbn: '', genre: 'genre', quantity: 1 },
    { title: 'title', author: 'author', isbn: 'isbn', genre: '', quantity: 1 },
    { title: 'title', author: 'author', isbn: 'isbn', genre: 'genre', quantity: 0 },
  ])('should throw an error when input is invalid', async payload => {
    const sut = new RegisterBookUseCase(bookRepository);

    await expect(sut.execute(payload)).rejects.toThrow('Invalid input');
  });
});
