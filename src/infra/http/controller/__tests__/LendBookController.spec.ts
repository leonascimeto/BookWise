import Sinon from 'sinon';

import LendBookUseCase from '../../../../application/usecase/LendBookUseCase';
import LendBookController from '../LendBookController';

describe('LendBookController', () => {
  const lendBookUseCase = Sinon.createStubInstance(LendBookUseCase);
  const request = {
    body: {
      bookId: '735993aa-ff1e-11ee-92c8-0242ac120002',
      studentId: '7af5f09a-ff1e-11ee-92c8-0242ac120002',
      outDate: '2024-01-25',
    },
  };

  test('should return 201 when lend book', async () => {
    const sut = new LendBookController(lendBookUseCase);
    const response = await sut.handle(request);

    expect(response.status).toBe(201);
    expect(lendBookUseCase.execute.calledOnce).toBeTruthy();
    expect(lendBookUseCase.execute.calledOnceWith(request.body)).toBeTruthy();
    expect(response.body).toBeUndefined();
  });

  test('should return 400 when lend book throws an error', async () => {
    lendBookUseCase.execute.rejects(new Error('any_error'));
    const sut = new LendBookController(lendBookUseCase);
    const response = await sut.handle(request);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'any_error' });
  });

  describe('LendBookSchema Zod', () => {
    test('should return 422 when bookId is not valid uuid', async () => {
      const sut = new LendBookController(lendBookUseCase);
      const response = await sut.handle({ body: { ...request.body, bookId: 'invalid_uuid' } });

      expect(response.status).toBe(422);
      expect(response.body.errors.fieldErrors).toEqual({ bookId: ['Book ID must be a valid UUID'] });
    });

    test('should return 422 when studentId is not valid uuid', async () => {
      const sut = new LendBookController(lendBookUseCase);
      const response = await sut.handle({ body: { ...request.body, studentId: 'invalid_uuid' } });

      expect(response.status).toBe(422);
      expect(response.body.errors.fieldErrors).toEqual({ studentId: ['Student ID must be a valid UUID'] });
    });

    test('should return 422 when outDate is not valid date', async () => {
      const sut = new LendBookController(lendBookUseCase);
      const response = await sut.handle({ body: { ...request.body, outDate: 'invalid_date' } });

      expect(response.status).toBe(422);
      expect(response.body.errors.fieldErrors).toEqual({ outDate: ['Out date must have the format yyyy-mm-dd'] });
    });
  });
});
