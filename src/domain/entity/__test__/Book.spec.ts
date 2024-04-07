import Book from '../Book';

describe('Book', () => {
  test('should create a book', () => {
    const payload = {
      title: 'title',
      author: 'author',
      isbn: 'isbn',
      genre: 'genre',
      quantity: 1,
    };

    const sut = Book.build(payload);

    expect(sut).toBeInstanceOf(Book);
    expect(sut.id).toBeDefined();
    expect(sut.title).toBe(payload.title);
    expect(sut.author).toBe(payload.author);
    expect(sut.isbn).toBe(payload.isbn);
    expect(sut.genre).toBe(payload.genre);
  });

  test('should restore a book', () => {
    const payload = {
      id: 'id',
      title: 'title',
      genre: 'genre',
      author: 'author',
      isbn: 'isbn',
      quantity: 1,
    };

    const sut = Book.build(payload);

    expect(sut).toBeInstanceOf(Book);
    expect(sut.id).toBe(payload.id);
    expect(sut.title).toBe(payload.title);
    expect(sut.author).toBe(payload.author);
    expect(sut.isbn).toBe(payload.isbn);
    expect(sut.genre).toBe(payload.genre);
  });
});
