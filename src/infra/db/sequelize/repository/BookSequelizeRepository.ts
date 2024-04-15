import { Op } from 'sequelize';

import BookRepository from '../../../../application/repository/BookRepository';
import Book from '../../../../domain/entity/Book';
import { dbSequelize } from '..';

export default class BookSequelizeRepository implements BookRepository {
  private readonly bookDao = dbSequelize.BookEntitySquelize;

  async save(book: Book): Promise<void> {
    try {
      const dao = this.bookDao.buildFromDomainModel(book);
      await dao.save();
    } catch (error) {
      console.error(error);
      throw new Error('Error to save book');
    }
  }

  async findById(id: string): Promise<Book> {
    try {
      const book = await this.bookDao.findByPk(id);
      if (!book) throw new Error('Book not found');
      return Book.build({
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        quantity: book.quantity,
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || 'Error to find book');
    }
  }

  async search(search: string): Promise<Book[]> {
    try {
      const books = await this.bookDao.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { author: { [Op.like]: `%${search}%` } },
            { genre: { [Op.like]: `%${search}%` } },
          ],
        },
      });

      return books.map(book =>
        Book.build({
          id: book.id,
          title: book.title,
          author: book.author,
          genre: book.genre,
          isbn: book.isbn,
          quantity: book.quantity,
        }),
      );
    } catch (error) {
      console.error(error);
      throw new Error('Error to search book');
    }
  }

  async existsISBN(isbn: string): Promise<boolean> {
    try {
      const book = await this.bookDao.findOne({ where: { isbn } });
      return !!book;
    } catch (error) {
      console.error(error);
      throw new Error('Error to check if isbn exists');
    }
  }
}
