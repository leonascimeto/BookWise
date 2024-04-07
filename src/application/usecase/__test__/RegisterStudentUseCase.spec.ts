import RegisterStudentUseCase from '../RegisterStudentUseCase';

describe('RegisterStudentUseCase', () => {
  const studentRepository = {
    save: jest.fn(),
    findById: jest.fn(),
  };

  const student = {
    name: 'any_name',
    matriculation: 'any_matriculation',
  };

  test('should register a student', async () => {
    const sut = new RegisterStudentUseCase(studentRepository);

    expect(await sut.execute(student)).toBeUndefined();

    expect(studentRepository.save).toHaveBeenCalledWith(expect.objectContaining(student));
    expect(studentRepository.save).toHaveBeenCalledTimes(1);
  });

  test.each([
    { name: '', matriculation: 'any_matriculation' },
    { name: 'any_name', matriculation: '' },
  ])('should throw an error when input is invalid', async payload => {
    const sut = new RegisterStudentUseCase(studentRepository);

    await expect(sut.execute(payload)).rejects.toThrow('Invalid student data');
  });
});
