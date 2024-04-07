import BanList from '../../domain/entity/BanList';

export interface BanListRepository {
  save(banList: any): Promise<void>;
  findById(id: string): Promise<any>;
  findByStudent(studentId: string): Promise<BanList[]>;
  existsLend(lendId: string): Promise<boolean>;
}
