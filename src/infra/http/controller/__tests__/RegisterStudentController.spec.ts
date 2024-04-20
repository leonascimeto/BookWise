import sinon from 'sinon';

import RegisterStudentUseCase from '../../../../application/usecase/RegisterStudentUseCase';
import RegisterStudentController from '../RegisterStudentController';

describe('RegisterStudentController', () => {
  const registerStudentUseCase = sinon.createStubInstance(RegisterStudentUseCase);

  const httpRequest = {
    body: {
      name: 'any_name',
      matriculation: 'any_matriculation',
    },
  };

  test('should register a student', async () => {
    registerStudentUseCase.execute.resolves(undefined);
    const sut = new RegisterStudentController(registerStudentUseCase);
    const response = await sut.handle(httpRequest);
    expect(response).toEqual({ status: 201 });
  });

  test('should return 400 when use case throws an error', async () => {
    registerStudentUseCase.execute.rejects(new Error('any_error'));
    const sut = new RegisterStudentController(registerStudentUseCase);
    const response = await sut.handle(httpRequest);
    expect(response).toEqual({ status: 400, body: { message: 'any_error' } });
  });

  describe('StudentSchema zod', () => {
    test('should return 422 when name is less than 2', async () => {
      const sut = new RegisterStudentController(registerStudentUseCase);
      const response = await sut.handle({ ...httpRequest, body: { ...httpRequest.body, name: '' } });

      expect(response.status).toBe(422);
      expect(response.body.errors.fieldErrors).toEqual({ name: ['Name needs to have at least 2 characters'] });
    });

    test('should return 422 when name is greater than 100', async () => {
      const sut = new RegisterStudentController(registerStudentUseCase);
      const response = await sut.handle({ ...httpRequest, body: { ...httpRequest.body, name: 'a'.repeat(101) } });

      expect(response.status).toBe(422);
      expect(response.body.errors.fieldErrors).toEqual({ name: ['Name must have less than 100 characters'] });
    });

    test('should return 422 when matriculation is less than 2', async () => {
      const sut = new RegisterStudentController(registerStudentUseCase);
      const response = await sut.handle({ ...httpRequest, body: { ...httpRequest.body, matriculation: '' } });

      expect(response.status).toBe(422);
      expect(response.body.errors.fieldErrors).toEqual({
        matriculation: ['Matriculation needs to have at least 2 characters'],
      });
    });

    test('should return 422 when matriculation is greater than 20', async () => {
      const sut = new RegisterStudentController(registerStudentUseCase);
      const response = await sut.handle({
        ...httpRequest,
        body: { ...httpRequest.body, matriculation: 'a'.repeat(21) },
      });

      expect(response.status).toBe(422);
      expect(response.body.errors.fieldErrors).toEqual({
        matriculation: ['Matriculation must have less than 20 characters'],
      });
    });
  });
});
