import LendRepository from '../../../../application/repository/LendRepository';
import Lend from '../../../../domain/entity/Lend';
import { dbSequelize } from '..';

export default class LendSequelizeRepository implements LendRepository {
  private readonly lendDao = dbSequelize.LendEntitySequelize;

  async save(lend: Lend): Promise<void> {
    try {
      const dao = this.lendDao.buildFromDomainModel(lend);
      const exist = await this.lendDao.findByPk(dao.id);
      if (exist) {
        await exist.update(dao);
        return;
      }
      await dao.save();
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message || 'Error to save lend');
    }
  }

  async findById(id: string): Promise<Lend> {
    try {
      const lend = await this.lendDao.findByPk(id);
      if (!lend) throw new Error('Lend not found');
      return Lend.build({
        id: lend.id,
        bookId: lend.bookId,
        studentId: lend.studentId,
        outDate: lend.outDate,
        devolutionDate: lend.devolutionDate,
        returnDate: lend.returnDate ?? undefined,
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message || 'Error to find lend');
    }
  }

  async countPeendingLendByBookId(bookId: string): Promise<number> {
    try {
      return await this.lendDao.count({ where: { bookId, returnDate: null } });
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message || 'Error to count pending lend by book id');
    }
  }

  async countPeendingLendByStudentId(studentId: string): Promise<number> {
    try {
      return await this.lendDao.count({ where: { studentId, returnDate: null } });
    } catch (error: any) {
      throw new Error(error?.message || 'Error to count pending lend by student id');
    }
  }

  async findPendingLends(): Promise<Lend[]> {
    try {
      const lends = await this.lendDao.findAll({ where: { returnDate: null } });
      return lends.map(lend =>
        Lend.build({
          id: lend.id,
          bookId: lend.bookId,
          studentId: lend.studentId,
          outDate: lend.outDate,
          devolutionDate: lend.devolutionDate,
          returnDate: lend.returnDate ?? undefined,
        }),
      );
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message || 'Error to find pending lends');
    }
  }
}
