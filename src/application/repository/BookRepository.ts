import Book from '../../domain/entity/Book';

export default interface BookRepository {
  save(book: Book): Promise<void>;
  findById(id: string): Promise<Book>;
  search(search: string): Promise<Book[]>;
  existsISBN(isbn: string): Promise<boolean>;
}
