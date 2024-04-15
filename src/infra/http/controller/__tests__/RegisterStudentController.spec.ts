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
});
