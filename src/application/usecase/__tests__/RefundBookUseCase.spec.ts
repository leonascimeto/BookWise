import Lend from '../../../domain/entity/Lend';
import Student from '../../../domain/entity/Student';
import RefundBookUseCase from '../RefundBookUseCase';

describe('RefundBookUseCase', () => {
  const studentRepository = {
    findById: jest.fn(),
    save: jest.fn(),
    matriculationExists: jest.fn(),
  };

  const lendRepository = {
    countPeendingLendByBookId: jest.fn(),
    countPeendingLendByStudentId: jest.fn(),
    save: jest.fn(),
    findById: jest.fn(),
    findPendingLends: jest.fn(),
  };

  const banListRepository = {
    save: jest.fn(),
    findById: jest.fn(),
    findByStudent: jest.fn(),
    existsLend: jest.fn(),
  };

  const student = {
    id: 'any_id',
    name: 'any_name',
    matriculation: 'any_matriculation',
  };

  const lend = {
    id: 'any_id',
    bookId: 'any_book_id',
    studentId: 'any_student_id',
    outDate: '2024-04-07',
    devolutionDate: '2024-04-07',
  };

  test('should refund book on time', async () => {
    studentRepository.findById.mockResolvedValue(Student.build(student));
    lendRepository.findById.mockResolvedValue(Lend.build(lend));

    const sut = new RefundBookUseCase(studentRepository, lendRepository, banListRepository);
    expect(await sut.execute({ lendId: lend.id, refundDate: '2024-04-07' })).toBeUndefined();
    expect(banListRepository.save).not.toHaveBeenCalled();
  });

  test('should throw an error when lend is not found', async () => {
    studentRepository.findById.mockResolvedValue(Student.build(student));
    lendRepository.findById.mockResolvedValue(null);

    const sut = new RefundBookUseCase(studentRepository, lendRepository, banListRepository);
    await expect(sut.execute({ lendId: lend.id, refundDate: '2024-04-07' })).rejects.toThrow('Lend not found');
  });

  test('should throw an error when student is not found', async () => {
    studentRepository.findById.mockResolvedValue(null);
    lendRepository.findById.mockResolvedValue(Lend.build(lend));

    const sut = new RefundBookUseCase(studentRepository, lendRepository, banListRepository);
    await expect(sut.execute({ lendId: lend.id, refundDate: '2024-04-07' })).rejects.toThrow('Student not found');
  });

  test('should register student in ban list when late devolution', async () => {
    studentRepository.findById.mockResolvedValue(Student.build(student));
    lendRepository.findById.mockResolvedValue(Lend.build(lend));

    const sut = new RefundBookUseCase(studentRepository, lendRepository, banListRepository);
    await sut.execute({ lendId: lend.id, refundDate: '2024-04-08' });

    expect(banListRepository.save).toHaveBeenCalled();
  });
});
