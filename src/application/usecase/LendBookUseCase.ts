import Lend from '../../domain/entity/Lend';
import { BanListRepository } from '../repository/BanListRepository';
import BookRepository from '../repository/BookRepository';
import LendRepository from '../repository/LendRepository';
import StudentRepository from '../repository/StudentRepository';

export default class LendBookUseCase {
  constructor(
    readonly bookRepository: BookRepository,
    readonly studentRepository: StudentRepository,
    readonly lendRepository: LendRepository,
    readonly banListRepository: BanListRepository,
  ) {}

  async execute(input: Input) {
    const { bookId, studentId, outDate } = input;
    const book = await this.bookRepository.findById(bookId);
    if (!book) throw new Error('Book not found');
    const student = await this.studentRepository.findById(studentId);
    if (!student) throw new Error('Student not found');
    const lend = Lend.build({ bookId, studentId, outDate });
    const quanityBookLended = await this.lendRepository.countLendByBookId(book.id);
    const quantityStudentLended = await this.lendRepository.countLendByStudentId(student.id);
    const studentBanList = await this.banListRepository.findByStudent(student.id);
    lend.studentAbleToLend({ quantityLend: quantityStudentLended, studentBanList });
    lend.bookIsDisponible(quanityBookLended, book.quantity);
    await this.lendRepository.save(lend);
  }
}

type Input = {
  bookId: string;
  studentId: string;
  outDate: string;
};
