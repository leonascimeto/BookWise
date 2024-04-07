export default class RegisterStudentUseCase {
  constructor(readonly studentRepository: any) {}

  async execute(input: Input) {
    const { name, matriculation } = input;
    if (!name || !matriculation) throw new Error('Invalid student data');
    await this.studentRepository.save({ name, matriculation });
  }
}

type Input = {
  matriculation: string;
  name: string;
};
