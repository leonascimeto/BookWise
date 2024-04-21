import BanList from '../../../../../domain/entity/BanList';
import Book from '../../../../../domain/entity/Book';
import Lend from '../../../../../domain/entity/Lend';
import Student from '../../../../../domain/entity/Student';
import { dbSequelize } from '../..';
import BanListSequelizeRepository from '../BanListSequelizeRepository';

describe('BanListSequelizeRepository', () => {
  const bookDao = dbSequelize.BookEntitySquelize;
  const studentDAO = dbSequelize.StudentEntitySequelize;
  const lendDAO = dbSequelize.LendEntitySequelize;
  const banListDAO = dbSequelize.BanListEntitySquelize;

  const book1 = Book.build({
    title: 'Any Title',
    author: 'Any Author',
    genre: 'Any Genre',
    isbn: '123456',
    quantity: 1,
  });

  const Student1 = Student.build({
    name: 'Any Name',
    matriculation: '123456',
  });

  const lend1 = Lend.build({
    bookId: book1.id,
    studentId: Student1.id,
    outDate: '2021-09-01',
    devolutionDate: '2021-09-15',
    returnDate: '2021-09-16',
  });

  const BanList1 = BanList.build({
    studentId: Student1.id,
    lendId: lend1.id,
    expiredAt: '2021-09-30',
  });

  beforeEach(async () => {
    await banListDAO.destroy({ where: {} });
    await lendDAO.destroy({ where: {} });
    await bookDao.destroy({ where: {} });
    await studentDAO.destroy({ where: {} });
  });

  test('should save a student in ban list', async () => {
    const bookMapper = bookDao.buildFromDomainModel(book1);
    await bookMapper.save();

    const studentMapper = studentDAO.buildFromDomainModel(Student1);
    await studentMapper.save();

    const lendMapper = lendDAO.buildFromDomainModel(lend1);
    await lendMapper.save();

    const sut = new BanListSequelizeRepository();
    await sut.save(BanList1);

    const banList = await banListDAO.findByPk(BanList1.id);
    expect(banList?.id).toEqual(BanList1.id);
    expect(banList?.studentId).toEqual(BanList1.studentId);
    expect(banList?.lendId).toEqual(BanList1.lendId);
    expect(banList?.expiredAt).toEqual(new Date(BanList1.expiredAt!));
  });

  test('should return a ban list by id', async () => {
    const bookMapper = bookDao.buildFromDomainModel(book1);
    await bookMapper.save();

    const studentMapper = studentDAO.buildFromDomainModel(Student1);
    await studentMapper.save();

    const lendMapper = lendDAO.buildFromDomainModel(lend1);
    await lendMapper.save();

    const banListMapper = banListDAO.buildFromDomainModel(BanList1);
    await banListMapper.save();

    const sut = new BanListSequelizeRepository();
    const banList = await sut.findById(BanList1.id);

    expect(banList?.id).toEqual(BanList1.id);
    expect(banList?.studentId).toEqual(BanList1.studentId);
    expect(banList?.lendId).toEqual(BanList1.lendId);
    expect(banList?.expiredAt).toEqual(new Date(BanList1.expiredAt!));
  });

  test('should return a ban list by student id', async () => {
    const bookMapper = bookDao.buildFromDomainModel(book1);
    await bookMapper.save();

    const studentMapper = studentDAO.buildFromDomainModel(Student1);
    await studentMapper.save();

    const lendMapper = lendDAO.buildFromDomainModel(lend1);
    await lendMapper.save();

    const banListMapper = banListDAO.buildFromDomainModel(BanList1);
    await banListMapper.save();

    const sut = new BanListSequelizeRepository();
    const banList = await sut.findByStudent(BanList1.studentId);

    expect(banList[0].id).toEqual(BanList1.id);
    expect(banList[0].studentId).toEqual(BanList1.studentId);
    expect(banList[0].lendId).toEqual(BanList1.lendId);
    expect(banList[0].expiredAt).toEqual(new Date(BanList1.expiredAt!));
  });

  test('should return true if lend exists', async () => {
    const bookMapper = bookDao.buildFromDomainModel(book1);
    await bookMapper.save();

    const studentMapper = studentDAO.buildFromDomainModel(Student1);
    await studentMapper.save();

    const lendMapper = lendDAO.buildFromDomainModel(lend1);
    await lendMapper.save();

    const banListMapper = banListDAO.buildFromDomainModel(BanList1);
    await banListMapper.save();

    const sut = new BanListSequelizeRepository();
    const exists = await sut.existsLend(BanList1.lendId);

    expect(exists).toBe(true);
  });

  test('should return false if lend not exists', async () => {
    const bookMapper = bookDao.buildFromDomainModel(book1);
    await bookMapper.save();

    const studentMapper = studentDAO.buildFromDomainModel(Student1);
    await studentMapper.save();

    const lendMapper = lendDAO.buildFromDomainModel(lend1);
    await lendMapper.save();

    const banListMapper = banListDAO.buildFromDomainModel(BanList1);
    await banListMapper.save();

    const sut = new BanListSequelizeRepository();
    const exists = await sut.existsLend('123456');

    expect(exists).toBe(false);
  });
});
