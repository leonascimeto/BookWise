import Book from '../../domain/entity/Book';

export default interface BookRepository {
  save(book: any): Promise<void>;
  findById(id: string): Promise<Book>;
  search(search: string): Promise<any[]>;
}
