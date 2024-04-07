import Student from '../../domain/entity/Student';
import StudentRepository from '../repository/StudentRepository';

export default class RegisterStudentUseCase {
  constructor(readonly studentRepository: StudentRepository) {}

  async execute(input: Input) {
    const { name, matriculation } = input;
    if (!name || !matriculation) throw new Error('Invalid student data');
    const student = Student.build({ matriculation, name });
    await this.studentRepository.save(student);
  }
}

type Input = {
  matriculation: string;
  name: string;
};
