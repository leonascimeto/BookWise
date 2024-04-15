import Student from '../../../../../domain/entity/Student';
import { dbSequelize } from '../..';
import StudentSequelizeRepository from '../StudentSequelizeRepository';

describe('StudentSequelizeRepository', () => {
  const studentDAO = dbSequelize.StudentEntitySequelize;

  const Student1 = Student.build({
    name: 'Any Name',
    matriculation: '123456',
  });

  beforeEach(async () => {
    await studentDAO.destroy({ where: {} });
  });

  test('should save a student', async () => {
    const sut = new StudentSequelizeRepository();

    expect(await sut.save(Student1)).toBe(undefined);
    const student = await studentDAO.findByPk(Student1.id);
    expect(student?.id).toEqual(Student1.id);
    expect(student?.name).toEqual(Student1.name);
    expect(student?.matriculation).toEqual(Student1.matriculation);
  });

  test('should return a student by id', async () => {
    const sut = new StudentSequelizeRepository();
    await sut.save(Student1);

    const student = await sut.findById(Student1.id);

    expect(student).toEqual(Student1);
  });

  test('should return false if matriculation not exists', async () => {
    const sut = new StudentSequelizeRepository();
    await sut.save(Student1);

    const exists = await sut.matriculationExists('1234567');

    expect(exists).toBe(false);
  });

  test('should return true if matriculation exists', async () => {
    const sut = new StudentSequelizeRepository();
    await sut.save(Student1);

    const exists = await sut.matriculationExists('123456');

    expect(exists).toBe(true);
  });
});
