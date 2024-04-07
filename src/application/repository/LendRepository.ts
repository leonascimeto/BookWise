export default interface LendRepository {
  save(lend: any): Promise<void>;
  findById(id: string): Promise<any>;
  countLendByBookId(bookId: string): Promise<number>;
  countLendByStudentId(studentId: string): Promise<number>;
}
