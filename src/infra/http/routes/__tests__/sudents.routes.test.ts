import supertest from 'supertest';

import StudentSequelizeRepository from '../../../db/sequelize/repository/StudentSequelizeRepository';
import HttpServer from '../../HttpServer';

describe('StudentsRoutes', () => {
  const httpServer = new HttpServer();
  const studentRepository = new StudentSequelizeRepository();
  const studentDao = studentRepository.studentDao;

  const { app } = httpServer;

  const request1 = {
    name: 'any_name',
    matriculation: 'any_matriculation',
  };

  beforeEach(async () => {
    await studentDao.destroy({ where: {} });
  });

  test('POST /students - should return 201', async () => {
    const response = await supertest(app).post('/students').send(request1);

    const student = await studentDao.findOne({ where: { name: request1.name } });
    expect(response.status).toBe(201);
    expect(student).toBeDefined();
    expect(student?.name).toBe(request1.name);
    expect(student?.matriculation).toBe(request1.matriculation);
    expect(student?.id).toBeDefined();
  });
});
