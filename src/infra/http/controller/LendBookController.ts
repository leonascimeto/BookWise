import { z } from 'zod';

import LendBookUseCase from '../../../application/usecase/LendBookUseCase';
import { formatErrorResponse, HttpResponse } from '../HttpResponse';

const LendBookSchema = z.object({
  bookId: z.string({ required_error: 'Book ID is required' }).uuid({ message: 'Book ID must be a valid UUID' }),
  studentId: z
    .string({ required_error: 'Student ID is required' })
    .uuid({ message: 'Student ID must be a valid UUID' }),
  outDate: z.string({ required_error: 'Out date is required' }).regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Out date must have the format yyyy-mm-dd',
  }),
});

export default class LendBookController {
  constructor(private readonly lendBookUseCase: LendBookUseCase) {}

  async handle(input: Input): Promise<HttpResponse<any>> {
    try {
      const { bookId, studentId, outDate } = LendBookSchema.parse(input.body);
      await this.lendBookUseCase.execute({ bookId, studentId, outDate });
      return { status: 201 };
    } catch (error) {
      return formatErrorResponse(error);
    }
  }
}

type Input = {
  body: {
    bookId: string;
    studentId: string;
    outDate: string;
  };
};
