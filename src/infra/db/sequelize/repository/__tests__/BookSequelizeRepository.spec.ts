import Book from '../../../../../domain/entity/Book';
import { dbSequelize } from '../..';
import BookSequelizeRepository from '../BookSequelizeRepository';

describe('BookSequelizeRepository', () => {
  const bookDao = dbSequelize.BookEntitySquelize;

  const book1 = Book.build({
    title: 'Any Title',
    author: 'Any Author',
    genre: 'Any Genre',
    isbn: '123456',
    quantity: 1,
  });

  const book2 = Book.build({
    title: 'Any Title 22',
    author: 'Any Author',
    genre: 'Any Genre',
    isbn: '1234568',
    quantity: 10,
  });

  const book3 = Book.build({
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    genre: 'Fantasy',
    isbn: '1234567',
    quantity: 5,
  });

  beforeEach(async () => {
    await bookDao.destroy({ where: {} });
  });

  test('should save a book', async () => {
    const sut = new BookSequelizeRepository();

    await sut.save(book1);

    const findBook = await bookDao.findByPk(book1.id);
    expect(findBook?.id).toEqual(book1.id);
    expect(findBook?.title).toEqual(book1.title);
    expect(findBook?.author).toEqual(book1.author);
    expect(findBook?.genre).toEqual(book1.genre);
    expect(findBook?.isbn).toEqual(book1.isbn);
    expect(findBook?.quantity).toEqual(book1.quantity);
  });

  test('should return a book by id', async () => {
    const sut = new BookSequelizeRepository();
    await sut.save(book1);

    const book = await sut.findById(book1.id);

    expect(book).toEqual(book1);
  });

  test('should return a erro if book not found', async () => {
    const sut = new BookSequelizeRepository();

    await expect(sut.findById('123')).rejects.toThrow('Book not found');
  });

  test('should return true if isbn exists', async () => {
    const sut = new BookSequelizeRepository();
    await sut.save(book1);

    const exists = await sut.existsISBN('123456');

    expect(exists).toBe(true);
  });

  test('should return false if isbn not exists', async () => {
    const sut = new BookSequelizeRepository();
    await sut.save(book1);

    const exists = await sut.existsISBN('1234567');

    expect(exists).toBe(false);
  });

  test('should search books by title', async () => {
    const sut = new BookSequelizeRepository();
    await sut.save(book1);
    await sut.save(book2);
    await sut.save(book3);

    const books = await sut.search('Any Title');

    expect(books).toEqual([book1, book2]);
  });

  test('should search books by author', async () => {
    const sut = new BookSequelizeRepository();
    await sut.save(book1);
    await sut.save(book2);
    await sut.save(book3);

    const books = await sut.search('Any Author');
    const books2 = await sut.search('J.K. Row');

    expect(books).toEqual([book1, book2]);
    expect(books2).toEqual([book3]);
  });

  test('should search books by genre', async () => {
    const sut = new BookSequelizeRepository();
    await sut.save(book1);
    await sut.save(book2);
    await sut.save(book3);

    const books = await sut.search('Any Genre');
    const books2 = await sut.search('Fantasy');

    expect(books).toEqual([book1, book2]);
    expect(books2).toEqual([book3]);
  });

  test('should return empty array if not found books', async () => {
    const sut = new BookSequelizeRepository();
    await sut.save(book1);
    await sut.save(book2);
    await sut.save(book3);

    const books = await sut.search('testando 123');

    expect(books).toEqual([]);
  });
});
