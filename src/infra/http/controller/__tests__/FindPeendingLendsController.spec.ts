import Sinon from 'sinon';

import FindPeendingLendsUseCase from '../../../../application/usecase/FindPeendingLendsUseCase';
import Lend from '../../../../domain/entity/Lend';
import FindPeendingLendsController from '../FindPeendingLendsController';

describe('FindPeendingLendsController', () => {
  const findPeendingLendsUseCase = Sinon.createStubInstance(FindPeendingLendsUseCase);
  const lend1 = Lend.build({
    bookId: 'any_book_id',
    outDate: '2024-03-07',
    studentId: 'any_student_id',
    devolutionDate: '2024-04-07',
  });

  test('should return 200 when there are pending lends', async () => {
    findPeendingLendsUseCase.execute.resolves([lend1]);

    const sut = new FindPeendingLendsController(findPeendingLendsUseCase);
    const response = await sut.handle();

    expect(response).toEqual({
      status: 200,
      body: [lend1],
    });
  });

  test('should return 400 when use case throws an error', async () => {
    findPeendingLendsUseCase.execute.rejects(new Error('any_error'));

    const sut = new FindPeendingLendsController(findPeendingLendsUseCase);
    const response = await sut.handle();

    expect(response).toEqual({ status: 400, body: { message: 'any_error' } });
  });

  test('should return 200 when there are no pending lends', async () => {
    findPeendingLendsUseCase.execute.resolves([]);

    const sut = new FindPeendingLendsController(findPeendingLendsUseCase);
    const response = await sut.handle();

    expect(response).toEqual({
      status: 200,
      body: [],
    });
  });
});
