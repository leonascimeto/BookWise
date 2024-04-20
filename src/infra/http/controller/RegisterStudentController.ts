import { z } from 'zod';

import RegisterStudentUseCase from '../../../application/usecase/RegisterStudentUseCase';
import { formatErrorResponse, HttpResponse } from '../HttpResponse';

const studentSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, { message: 'Name needs to have at least 2 characters' })
    .max(100, { message: 'Name must have less than 100 characters' }),
  matriculation: z
    .string({ required_error: 'Matriculation is required' })
    .min(2, { message: 'Matriculation needs to have at least 2 characters' })
    .max(20, { message: 'Matriculation must have less than 20 characters' }),
});

export default class RegisterStudentController {
  constructor(readonly registerStudentUseCase: RegisterStudentUseCase) {
    this.registerStudentUseCase = registerStudentUseCase;
  }

  async handle(httpRquest: Input): Promise<HttpResponse<any>> {
    try {
      const { matriculation, name } = studentSchema.parse(httpRquest.body);
      await this.registerStudentUseCase.execute({ matriculation, name });
      return { status: 201 };
    } catch (error: any) {
      return formatErrorResponse(error);
    }
  }
}

type Input = {
  body: {
    matriculation: string;
    name: string;
  };
};
