import Lend from '../../domain/entity/Lend';
import BookRepository from '../repository/BookRepository';
import LendRepository from '../repository/LendRepository';
import StudentRepository from '../repository/StudentRepository';

export default class LendBookUseCase {
  constructor(
    readonly bookRepository: BookRepository,
    readonly studentRepository: StudentRepository,
    readonly lendRepository: LendRepository,
  ) {}

  async execute(input: Input) {
    const { bookId, studentId, outDate } = input;
    const book = await this.bookRepository.findById(bookId);
    const student = await this.studentRepository.findById(studentId);
    const lend = Lend.build({ bookId, studentId, outDate });
    const quanityBookLended = await this.lendRepository.countLendByBookId(book.id);
    const quantityStudentLended = await this.lendRepository.countLendByStudentId(student.id);
    lend.studentAbleToLend(quantityStudentLended);
    lend.bookIsDisponible(quanityBookLended, book.quantity);
    await this.lendRepository.save(lend);
  }
}

type Input = {
  bookId: string;
  studentId: string;
  outDate: string;
};
