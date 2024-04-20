import { z } from 'zod';

import SearchBooksUseCase from '../../../application/usecase/SearchBooksUseCase';
import Book from '../../../domain/entity/Book';
import { formatErrorResponse, HttpResponse } from '../HttpResponse';

const searchBookSchema = z.object({
  search: z
    .string({ required_error: 'Search value is required' })
    .min(2, { message: 'Search needs to have at least 2 character' }),
});

export default class SearchBooksController {
  constructor(readonly searchBookUseCase: SearchBooksUseCase) {}

  async handle(request: SearchBookRequest): Promise<HttpResponse<Book[] | any>> {
    try {
      const { search } = searchBookSchema.parse(request.query);
      const books = await this.searchBookUseCase.execute({ value: search });
      return {
        status: 200,
        body: books,
      };
    } catch (error) {
      return formatErrorResponse(error);
    }
  }
}

export type SearchBookRequest = {
  query: {
    search: string;
  };
};
