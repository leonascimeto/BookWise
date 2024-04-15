import Lend from '../../../domain/entity/Lend';
import LendRepository from '../../repository/LendRepository';
import FindPeendingLendsUseCase from '../FindPeendingLendsUseCase';

describe('FindPeendingLendsUseCase', () => {
  const lend1 = Lend.build({
    id: 'any_id',
    bookId: 'any_book_id',
    studentId: 'any_student_id',
    outDate: '2024-04-07',
    devolutionDate: '2024-04-07',
  });

  const lend2 = Lend.build({
    id: 'any_id2',
    bookId: 'any_book_id2',
    studentId: 'any_student_id2',
    outDate: '2024-04-07',
    devolutionDate: '2024-04-07',
  });

  const peendingLends = [lend1, lend2];

  const lendRepository: LendRepository = jest.fn().mockReturnValue({
    findPendingLends: jest.fn().mockResolvedValue(peendingLends),
  })();

  test('should return a list of pending lends', async () => {
    const sut = new FindPeendingLendsUseCase(lendRepository);
    const lends = await sut.execute();

    expect(lends).toEqual(peendingLends);
    expect(lends).toHaveLength(2);
    expect(lendRepository.findPendingLends).toHaveBeenCalledTimes(1);
  });
});
