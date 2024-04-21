import supertest from 'supertest';

import Book from '../../../../domain/entity/Book';
import Lend from '../../../../domain/entity/Lend';
import Student from '../../../../domain/entity/Student';
import { dbSequelize } from '../../../db/sequelize';
import HttpServer from '../../HttpServer';

describe('LendRoutes', () => {
  const httpServer = new HttpServer();
  const { app } = httpServer;

  const studentDao = dbSequelize.StudentEntitySequelize;
  const bookDao = dbSequelize.BookEntitySquelize;
  const lendDao = dbSequelize.LendEntitySequelize;
  const banDao = dbSequelize.BanListEntitySquelize;

  const book1 = Book.build({
    author: 'any_author',
    genre: 'any_genre',
    isbn: '1122334455667',
    title: 'any_title',
    quantity: 5,
  });

  const student1 = Student.build({
    matriculation: 'any_matriculation',
    name: 'any_name',
  });

  beforeEach(async () => {
    await lendDao.destroy({ where: {} });
    await studentDao.destroy({ where: {} });
    await bookDao.destroy({ where: {} });

    const bookMapper = bookDao.buildFromDomainModel(book1);
    await bookMapper.save();

    const studentMapper = studentDao.buildFromDomainModel(student1);
    await studentMapper.save();
  });

  const request = {
    body: {
      studentId: student1.id,
      bookId: book1.id,
      outDate: '2021-09-01',
    },
  };

  test('POST /lends - should return 201', async () => {
    const response = await supertest(app).post('/lends').send(request.body);

    const lends = await lendDao.findAll();
    expect(response.status).toBe(201);
    expect(lends).toHaveLength(1);
    expect(lends[0].bookId).toBe(book1.id);
    expect(lends[0].studentId).toBe(student1.id);
    expect(lends[0].outDate).toEqual(new Date(request.body.outDate));
  });

  test('GET /lends/peending - should return 200', async () => {
    const lendEntity1 = Lend.build({
      bookId: book1.id,
      studentId: student1.id,
      outDate: '2021-09-01',
    });
    const lend1Dao = lendDao.buildFromDomainModel(lendEntity1);
    await lend1Dao.save();

    const lendEntity2 = Lend.build({
      bookId: book1.id,
      studentId: student1.id,
      outDate: '2021-09-01',
    });
    const lend2Dao = lendDao.buildFromDomainModel(lendEntity2);
    await lend2Dao.save();

    const lendEntityReturned = Lend.build({
      bookId: book1.id,
      studentId: student1.id,
      outDate: '2021-09-01',
      returnDate: '2021-09-02',
    });
    const lendReturnedDao = lendDao.buildFromDomainModel(lendEntityReturned);
    await lendReturnedDao.save();

    const response = await supertest(app).get('/lends/peending');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].id).not.toBe(lendEntityReturned.id);
    expect(response.body[1].id).not.toBe(lendEntityReturned.id);
  });

  test('PATCH /lends/:id/refund - should return 204 without ban', async () => {
    const lendEntity1 = Lend.build({
      bookId: book1.id,
      studentId: student1.id,
      outDate: '2024-04-15',
    });
    const lend1Dao = lendDao.buildFromDomainModel(lendEntity1);
    await lend1Dao.save();

    const response = await supertest(app).patch(`/lends/${lendEntity1.id}/refund`).send({
      refundDate: '2024-04-18',
    });

    expect(response.status).toBe(204);
    const ban = await banDao.findOne({ where: { studentId: student1.id } });
    expect(ban).toBeNull();
  });

  test('PATCH /lends/:id/refund - should return 204 with ban', async () => {
    const lendEntity1 = Lend.build({
      bookId: book1.id,
      studentId: student1.id,
      outDate: '2024-02-15',
    });
    const lend1Dao = lendDao.buildFromDomainModel(lendEntity1);
    await lend1Dao.save();

    const response = await supertest(app).patch(`/lends/${lendEntity1.id}/refund`).send({
      refundDate: '2024-04-18',
    });

    expect(response.status).toBe(204);
    const ban = await banDao.findOne({ where: { studentId: student1.id } });
    expect(ban).toBeDefined();
    expect(ban?.studentId).toBe(student1.id);
  });
});
