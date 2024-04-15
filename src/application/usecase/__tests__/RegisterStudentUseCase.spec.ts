import StudentRepository from '../../repository/StudentRepository';
import RegisterStudentUseCase from '../RegisterStudentUseCase';

describe('RegisterStudentUseCase', () => {
  const studentRepository: StudentRepository = {
    save: jest.fn(),
    findById: jest.fn(),
    matriculationExists: jest.fn(),
  };

  const student = {
    name: 'any_name',
    matriculation: 'any_matriculation',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should register a student', async () => {
    (studentRepository.matriculationExists as jest.Mock).mockResolvedValue(false);
    const sut = new RegisterStudentUseCase(studentRepository);

    expect(await sut.execute(student)).toBeUndefined();

    expect(studentRepository.save).toHaveBeenCalledWith(expect.objectContaining(student));
    expect(studentRepository.save).toHaveBeenCalledTimes(1);
  });

  test('should throw an error when matriculation already exists', async () => {
    (studentRepository.matriculationExists as jest.Mock).mockResolvedValue(true);
    const sut = new RegisterStudentUseCase(studentRepository);

    await expect(sut.execute(student)).rejects.toThrow('Matriculation already exists');
  });

  test.each([
    { name: '', matriculation: 'any_matriculation' },
    { name: 'any_name', matriculation: '' },
  ])('should throw an error when input is invalid', async payload => {
    (studentRepository.matriculationExists as jest.Mock).mockResolvedValue(false);
    const sut = new RegisterStudentUseCase(studentRepository);

    await expect(sut.execute(payload)).rejects.toThrow('Invalid student data');
  });
});
