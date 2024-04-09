import Lend from '../../domain/entity/Lend';

export default interface LendRepository {
  save(lend: any): Promise<void>;
  findById(id: string): Promise<Lend>;
  countPeendingLendByBookId(bookId: string): Promise<number>;
  countPeendingLendByStudentId(studentId: string): Promise<number>;
  findPendingLends(): Promise<Lend[]>;
}
