import Book from '../../../../../domain/entity/Book';
import Lend from '../../../../../domain/entity/Lend';
import Student from '../../../../../domain/entity/Student';
import { dbSequelize } from '../..';
import LendSequelizeRepository from '../LendSequelizeRepository';

describe('LendSequelizeRepository', () => {
  const lendDao = dbSequelize.LendEntitySequelize;
  const bookDao = dbSequelize.BookEntitySquelize;
  const studentDao = dbSequelize.StudentEntitySequelize;

  const book1 = Book.build({
    title: 'Any Title',
    author: 'Any Author',
    genre: 'Any Genre',
    isbn: '123456',
    quantity: 1,
  });

  const student1 = Student.build({
    name: 'Any Name',
    matriculation: '123456',
  });

  beforeEach(async () => {
    await lendDao.destroy({ where: {} });
    await bookDao.destroy({ where: {} });
    await studentDao.destroy({ where: {} });
  });

  test('should lend a book to a student', async () => {
    const sut = new LendSequelizeRepository();
    const bookMapper = bookDao.buildFromDomainModel(book1);
    await bookMapper.save();

    const studentMapper = studentDao.buildFromDomainModel(student1);
    await studentMapper.save();

    const lend = Lend.build({
      bookId: book1.id,
      studentId: student1.id,
      outDate: '2021-09-01',
      devolutionDate: '2021-09-15',
    });

    await sut.save(lend);

    const lendFinded = await lendDao.findOne({ where: { id: lend.id } });

    expect(lendFinded).toBeTruthy();
    expect(lendFinded?.id).toEqual(lend.id);
    expect(lendFinded?.bookId).toEqual(lend.bookId);
    expect(lendFinded?.studentId).toEqual(lend.studentId);
    expect(lendFinded?.outDate).toEqual(new Date(lend.outDate));
    expect(lendFinded?.devolutionDate).toEqual(new Date(lend.devolutionDate!));
    expect(lendFinded?.returnDate).toBeNull();
  });

  test('should return a lend by id', async () => {
    const sut = new LendSequelizeRepository();
    const bookMapper = bookDao.buildFromDomainModel(book1);
    await bookMapper.save();

    const studentMapper = studentDao.buildFromDomainModel(student1);
    await studentMapper.save();

    const lend = Lend.build({
      bookId: book1.id,
      studentId: student1.id,
      outDate: '2021-09-01',
      devolutionDate: '2021-09-15',
    });

    await lendDao.buildFromDomainModel(lend).save();

    const lendFinded = await sut.findById(lend.id);

    expect(lendFinded.id).toEqual(lend.id);
    expect(lendFinded.bookId).toEqual(lend.bookId);
    expect(lendFinded.studentId).toEqual(lend.studentId);
    expect(lendFinded.outDate).toEqual(new Date(lend.outDate));
    expect(lendFinded.devolutionDate).toEqual(new Date(lend.devolutionDate!));
    expect(lendFinded.returnDate).toBeNull();
  });

  test('should return a erro if lend not found', async () => {
    const sut = new LendSequelizeRepository();

    await expect(sut.findById('123')).rejects.toThrow('Lend not found');
  });

  test('should count pending lend by book id', async () => {
    const sut = new LendSequelizeRepository();
    const bookMapper = bookDao.buildFromDomainModel(book1);
    await bookMapper.save();

    const studentMapper = studentDao.buildFromDomainModel(student1);
    await studentMapper.save();

    const lend = Lend.build({
      bookId: book1.id,
      studentId: student1.id,
      outDate: '2021-09-01',
      devolutionDate: '2021-09-15',
    });

    await lendDao.buildFromDomainModel(lend).save();

    const count = await sut.countPeendingLendByBookId(book1.id);

    expect(count).toBe(1);
  });

  test('should count pending lend by student id', async () => {
    const sut = new LendSequelizeRepository();
    const bookMapper = bookDao.buildFromDomainModel(book1);
    await bookMapper.save();

    const studentMapper = studentDao.buildFromDomainModel(student1);
    await studentMapper.save();

    const lend = Lend.build({
      bookId: book1.id,
      studentId: student1.id,
      outDate: '2021-09-01',
      devolutionDate: '2021-09-15',
    });

    await lendDao.buildFromDomainModel(lend).save();

    const count = await sut.countPeendingLendByStudentId(student1.id);

    expect(count).toBe(1);
  });

  test('should return a list of pending lends', async () => {
    const sut = new LendSequelizeRepository();
    const bookMapper = bookDao.buildFromDomainModel(book1);
    await bookMapper.save();

    const studentMapper = studentDao.buildFromDomainModel(student1);
    await studentMapper.save();

    const lend = Lend.build({
      bookId: book1.id,
      studentId: student1.id,
      outDate: '2021-09-01',
      devolutionDate: '2021-09-15',
    });

    await lendDao.buildFromDomainModel(lend).save();

    const lends = await sut.findPendingLends();

    expect(lends).toHaveLength(1);
    expect(lends[0].id).toEqual(lend.id);
    expect(lends[0].bookId).toEqual(lend.bookId);
    expect(lends[0].studentId).toEqual(lend.studentId);
    expect(lends[0].outDate).toEqual(new Date(lend.outDate));
    expect(lends[0].devolutionDate).toEqual(new Date(lend.devolutionDate!));
    expect(lends[0].returnDate).toBeNull();
  });
});
