import { z } from 'zod';

import RegisterBookUseCase from '../../../application/usecase/RegisterBookUseCase';
import { formatErrorResponse } from '../HttpResponse';

const BookSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, { message: 'Title needs to have at least 1 character' })
    .max(255, { message: 'Title must have less than 255 characters' }),
  author: z
    .string({ required_error: 'Author is required' })
    .min(2, { message: 'Author needs to have at least 2 characters' })
    .max(100, { message: 'Author must have less than 100 characters' }),
  genre: z
    .string({ required_error: 'Genre is required' })
    .min(2, { message: 'Genre needs to have at least 2 characters' })
    .max(80, { message: 'Genre must have less than 80 characters' }),
  isbn: z.string({ required_error: 'ISBN is required' }).length(13, { message: 'ISBN must have 13 characters' }),
  quantity: z.number({ required_error: 'Quantity is required' }).positive({ message: 'Quantity must be positive' }),
});

export default class RegisterBookController {
  constructor(readonly registerBookUseCase: RegisterBookUseCase) {}

  async handle(httpRquest: RegisterBookRequest): Promise<any> {
    try {
      const { title, author, genre, isbn, quantity } = BookSchema.parse(httpRquest.body);
      await this.registerBookUseCase.execute({ title, author, genre, isbn, quantity });
      return { status: 201 };
    } catch (error: any) {
      return formatErrorResponse(error);
    }
  }
}

export type RegisterBookRequest = {
  body: {
    title: string;
    author: string;
    genre: string;
    isbn: string;
    quantity: number;
  };
};
