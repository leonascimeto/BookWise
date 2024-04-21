import { BanListRepository } from '../../../../application/repository/BanListRepository';
import BanList from '../../../../domain/entity/BanList';
import { dbSequelize } from '..';

export default class BanListSequelizeRepository implements BanListRepository {
  readonly banListDao = dbSequelize.BanListEntitySquelize;
  async save(banList: BanList): Promise<void> {
    try {
      const dao = this.banListDao.buildFromDomainModel(banList);
      await dao.save();
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || 'Error to save ban list');
    }
  }

  async findById(id: string): Promise<BanList> {
    try {
      const banList = await this.banListDao.findByPk(id);
      if (!banList) throw new Error('Ban list not found');
      return BanList.build({
        id: banList.id,
        studentId: banList.studentId,
        lendId: banList.lendId,
        expiredAt: banList.expiredAt,
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || 'Error to find ban list');
    }
  }

  async findByStudent(studentId: string): Promise<BanList[]> {
    try {
      const banList = await this.banListDao.findAll({ where: { studentId } });
      return banList.map(ban =>
        BanList.build({
          id: ban.id,
          studentId: ban.studentId,
          lendId: ban.lendId,
          expiredAt: ban.expiredAt,
        }),
      );
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || 'Error to find ban list');
    }
  }

  async existsLend(lendId: string): Promise<boolean> {
    try {
      const banList = await this.banListDao.findOne({ where: { lendId } });
      return !!banList;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || 'Error to check if lend exists');
    }
  }
}
