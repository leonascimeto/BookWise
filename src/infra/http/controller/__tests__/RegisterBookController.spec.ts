import Sinon from 'sinon';

import RegisterBookUseCase from '../../../../application/usecase/RegisterBookUseCase';
import RegisterBookController, { RegisterBookRequest } from '../RegisterBookController';

describe('RegisterBookController', () => {
  const registerBookUseCase = Sinon.createStubInstance(RegisterBookUseCase);
  const request: RegisterBookRequest = {
    body: {
      author: 'any_author',
      genre: 'any_genre',
      isbn: '1111222333444',
      quantity: 1,
      title: 'any_title',
    },
  };

  test('should return 201 when book is registered', async () => {
    const sut = new RegisterBookController(registerBookUseCase);
    const response = await sut.handle(request);
    expect(response.status).toBe(201);
    expect(registerBookUseCase.execute.calledOnceWith(request.body)).toBeTruthy();
    expect(registerBookUseCase.execute.calledOnce).toBeTruthy();
  });

  test('should return 400 when book is not registered', async () => {
    registerBookUseCase.execute.rejects(new Error('any_error'));
    const sut = new RegisterBookController(registerBookUseCase);
    const response = await sut.handle(request);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'any_error' });
  });

  describe('BookSchema Zod', () => {
    test('should return 422 when title is not provided', async () => {
      const sut = new RegisterBookController(registerBookUseCase);
      const response = await sut.handle({ body: { ...request.body, title: '' } });
      console.log(response);
      expect(response.status).toBe(422);
      expect(response.body.errors.fieldErrors).toEqual({ title: ['Title needs to have at least 1 character'] });
    });

    test('should return 422 when title has more than 255 characters', async () => {
      const sut = new RegisterBookController(registerBookUseCase);
      const response = await sut.handle({ body: { ...request.body, title: 'a'.repeat(256) } });
      expect(response.status).toBe(422);
      expect(response.body.errors.fieldErrors).toEqual({ title: ['Title must have less than 255 characters'] });
    });

    test('should return 422 when author is not provided', async () => {
      const sut = new RegisterBookController(registerBookUseCase);
      const response = await sut.handle({ body: { ...request.body, author: '' } });
      expect(response.status).toBe(422);
      expect(response.body.errors.fieldErrors).toEqual({ author: ['Author needs to have at least 2 characters'] });
    });

    test('should return 422 when author has more than 100 characters', async () => {
      const sut = new RegisterBookController(registerBookUseCase);
      const response = await sut.handle({ body: { ...request.body, author: 'a'.repeat(101) } });
      expect(response.status).toBe(422);
      expect(response.body.errors.fieldErrors).toEqual({ author: ['Author must have less than 100 characters'] });
    });

    test('should return 422 when genre is not provided', async () => {
      const sut = new RegisterBookController(registerBookUseCase);
      const response = await sut.handle({ body: { ...request.body, genre: '' } });
      expect(response.status).toBe(422);
      expect(response.body.errors.fieldErrors).toEqual({ genre: ['Genre needs to have at least 2 characters'] });
    });

    test('should return 422 when genre has more than 80 characters', async () => {
      const sut = new RegisterBookController(registerBookUseCase);
      const response = await sut.handle({ body: { ...request.body, genre: 'a'.repeat(81) } });
      expect(response.status).toBe(422);
      expect(response.body.errors.fieldErrors).toEqual({ genre: ['Genre must have less than 80 characters'] });
    });

    test('should return 422 when isbn has more than 13 characters', async () => {
      const sut = new RegisterBookController(registerBookUseCase);
      const response = await sut.handle({ body: { ...request.body, isbn: '1'.repeat(12) } });
      expect(response.status).toBe(422);
      expect(response.body.errors.fieldErrors).toEqual({ isbn: ['ISBN must have 13 characters'] });
    });

    test('should return 422 when quantity is not provided', async () => {
      const sut = new RegisterBookController(registerBookUseCase);
      const response = await sut.handle({ body: { ...request.body, quantity: 0 } });
      expect(response.status).toBe(422);
      expect(response.body.errors.fieldErrors).toEqual({ quantity: ['Quantity must be positive'] });
    });
  });
});
