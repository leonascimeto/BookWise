import crypto from 'crypto';
import { DataTypes, Model, Sequelize } from 'sequelize';

import BanList from '../../../../domain/entity/BanList';

export class BanListEntitySquelize extends Model {
  id!: string;
  lendId!: string;
  studentId!: string;
  expiredAt!: string;

  public static initModel(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
        },
        lendId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'lends',
            key: 'id',
          },
        },
        studentId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'students',
            key: 'id',
          },
        },
        expiredAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'ban_lists',
        timestamps: false,
      },
    );
  }

  public static buildFromDomainModel(banList: BanList): BanListEntitySquelize {
    return new BanListEntitySquelize({
      id: banList.id || crypto.randomUUID(),
      lendId: banList.lendId,
      studentId: banList.studentId,
      expiredAt: banList.expiredAt,
    });
  }
}
