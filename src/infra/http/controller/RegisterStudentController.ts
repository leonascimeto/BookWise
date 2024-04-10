import RegisterStudentUseCase from '../../../application/usecase/RegisterStudentUseCase';

export default class RegisterStudentController {
  constructor(readonly registerStudentUseCase: RegisterStudentUseCase) {
    this.registerStudentUseCase = registerStudentUseCase;
  }

  async handle(httpRquest: Input): Promise<Output> {
    try {
      const { matriculation, name } = httpRquest.body;
      await this.registerStudentUseCase.execute({ matriculation, name });
      return { status: 201 };
    } catch (error: any) {
      return { status: 400, body: { message: error.message } };
    }
  }
}

type Input = {
  body: {
    matriculation: string;
    name: string;
  };
};

type Output = {
  status: number;
  body?: any;
};
