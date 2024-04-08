import BanList from '../../domain/entity/BanList';
import { BanListRepository } from '../repository/BanListRepository';
import LendRepository from '../repository/LendRepository';
import StudentRepository from '../repository/StudentRepository';

export default class RefundBookUseCase {
  constructor(
    readonly studentRepository: StudentRepository,
    readonly lendRepository: LendRepository,
    readonly banListRepository: BanListRepository,
  ) {}

  async execute(input: Input): Promise<void> {
    const { lendId, studentId, refundDate } = input;
    const lend = await this.lendRepository.findById(lendId);
    if (!lend) throw new Error('Lend not found');
    const student = await this.studentRepository.findById(studentId);
    if (!student) throw new Error('Student not found');
    lend.refundBook(refundDate);
    const isLate = lend.isLateDevolution();
    if (isLate) {
      const ban = BanList.build({ lendId: lend.id, studentId: student.id });
      await this.banListRepository.save(ban);
    }
    await this.lendRepository.save(lend);
  }
}

type Input = {
  lendId: string;
  studentId: string;
  refundDate: string;
};
