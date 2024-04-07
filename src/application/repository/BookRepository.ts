export default interface BookRepository {
  save(book: any): Promise<void>;
  search(search: string): Promise<any[]>;
}
