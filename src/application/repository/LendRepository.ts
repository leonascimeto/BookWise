import Lend from '../../domain/entity/Lend';

export default interface LendRepository {
  save(lend: any): Promise<void>;
  findById(id: string): Promise<Lend>;
  countLendByBookId(bookId: string): Promise<number>;
  countLendByStudentId(studentId: string): Promise<number>;
}
