import Sinon from 'sinon';

import SearchBooksUseCase from '../../../../application/usecase/SearchBooksUseCase';
import Book from '../../../../domain/entity/Book';
import SearchBooksController from '../SearchBooksController';

describe('SearchBookController', () => {
  const searchBookUseCase = Sinon.createStubInstance(SearchBooksUseCase);
  const book1 = Book.build({
    id: '735993aa-ff1e-11ee-92c8-0242ac120002',
    title: 'any_title',
    author: 'any_author',
    isbn: '1111222333444',
    genre: 'any_genre',
    quantity: 1,
  });

  const book2 = Book.build({
    id: '7af5f09a-ff1e-11ee-92c8-0242ac120003',
    title: 'any_title2',
    author: 'any_author2',
    genre: 'any_genre2',
    isbn: '1111222333442',
    quantity: 4,
  });

  test('should return 200 when search books', async () => {
    searchBookUseCase.execute.resolves([book1, book2]);
    const sut = new SearchBooksController(searchBookUseCase);
    const response = await sut.handle({ query: { search: 'any_title' } });

    expect(response.status).toBe(200);
    expect(searchBookUseCase.execute.calledOnceWith({ value: 'any_title' })).toBeTruthy();
    expect(response.body).toEqual([book1, book2]);
  });

  test('should return 400 when search books throws an error', async () => {
    searchBookUseCase.execute.rejects(new Error('any_error'));
    const sut = new SearchBooksController(searchBookUseCase);
    const response = await sut.handle({ query: { search: 'any_title' } });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'any_error' });
  });

  test('should return 422 when search is not provided', async () => {
    const sut = new SearchBooksController(searchBookUseCase);
    const response = await sut.handle({ query: { search: '' } });

    expect(response.status).toBe(422);
    expect(response.body.errors.fieldErrors).toEqual({ search: ['Search needs to have at least 2 character'] });
  });
});
