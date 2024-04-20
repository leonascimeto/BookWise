import Sinon from 'sinon';

import RefundBookUseCase from '../../../../application/usecase/RefundBookUseCase';
import RefundBookController from '../RefundBookController';

describe('RefundBookController', () => {
  const refundBookUseCase = Sinon.createStubInstance(RefundBookUseCase);

  const request = {
    body: {
      refundDate: '2024-01-25',
    },
    params: {
      lendId: '735993aa-ff1e-11ee-92c8-0242ac120002',
    },
  };

  test('should return 204 when refund book', async () => {
    const sut = new RefundBookController(refundBookUseCase);
    const response = await sut.handle(request);

    expect(response.status).toBe(204);
    expect(refundBookUseCase.execute.calledOnce).toBeTruthy();
    expect(
      refundBookUseCase.execute.calledOnceWith({
        lendId: request.params.lendId,
        refundDate: request.body.refundDate,
      }),
    ).toBeTruthy();
    expect(response.body).toBeUndefined();
  });

  test('should return 400 when refund book throws an error', async () => {
    refundBookUseCase.execute.rejects(new Error('any_error'));
    const sut = new RefundBookController(refundBookUseCase);
    const response = await sut.handle(request);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'any_error' });
  });

  describe('RefundBookSchema Zod', () => {
    test('should return 422 when refundDate is not valid date', async () => {
      const sut = new RefundBookController(refundBookUseCase);
      const response = await sut.handle({ ...request, body: { ...request.body, refundDate: 'invalid_date' } });

      expect(response.status).toBe(422);
      expect(response.body.errors.fieldErrors).toEqual({ refundDate: ['Refund date must have the format yyyy-mm-dd'] });
    });

    test('should return 422 when lendId is not valid uuid', async () => {
      const sut = new RefundBookController(refundBookUseCase);
      const response = await sut.handle({ ...request, params: { ...request.params, lendId: 'invalid_uuid' } });

      expect(response.status).toBe(422);
      expect(response.body.errors.fieldErrors).toEqual({ lendId: ['Lend ID must be a valid UUID'] });
    });
  });
});
