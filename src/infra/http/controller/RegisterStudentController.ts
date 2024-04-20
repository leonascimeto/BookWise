import RegisterStudentUseCase from '../../../application/usecase/RegisterStudentUseCase';
import { HttpResponse } from '../HttpResponse';

export default class RegisterStudentController {
  constructor(readonly registerStudentUseCase: RegisterStudentUseCase) {
    this.registerStudentUseCase = registerStudentUseCase;
  }

  async handle(httpRquest: Input): Promise<HttpResponse<any>> {
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
