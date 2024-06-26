import supertest from 'supertest';

import BookSequelizeRepository from '../../../db/sequelize/repository/BookSequelizeRepository';
import { RegisterBookRequest } from '../../controller/RegisterBookController';
import HttpServer from '../../HttpServer';

describe('BookRoutes', () => {
  const httpServer = new HttpServer();
  const bookRepository = new BookSequelizeRepository();
  const bookDao = bookRepository.bookDao;

  const { app } = httpServer;

  const request: RegisterBookRequest = {
    body: {
      author: 'Robert Cecil Martin',
      genre: 'Software Engineering',
      isbn: '9780132350884',
      quantity: 10,
      title: 'Clean Code',
    },
  };

  beforeEach(async () => {
    await bookDao.destroy({ where: {} });
  });

  test('POST /books - should return 201', async () => {
    const response = await supertest(app).post('/books').send(request.body);

    const book = await bookDao.findOne({ where: { title: request.body.title } });
    expect(response.status).toBe(201);
    expect(book).toBeDefined();
    expect(book?.title).toBe(request.body.title);
    expect(book?.author).toBe(request.body.author);
    expect(book?.genre).toBe(request.body.genre);
    expect(book?.isbn).toBe(request.body.isbn);
    expect(book?.quantity).toBe(request.body.quantity);
    expect(book?.id).toBeDefined();
  });

  test('GET /books - should return 200', async () => {
    await bookDao.create(request.body);

    const response = await supertest(app).get('/books').query({ search: 'Clean Code' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe(request.body.title);
  });
});
