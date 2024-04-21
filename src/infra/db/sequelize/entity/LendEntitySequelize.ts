import crypto from 'crypto';
import { DataTypes, Model, Sequelize } from 'sequelize';

import Lend from '../../../../domain/entity/Lend';

export class LendEntitySequelize extends Model {
  id!: string;
  bookId!: string;
  studentId!: string;
  outDate!: string;
  returnDate?: string | null;
  devolutionDate!: string;

  static initModel(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
        },
        bookId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'books',
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
        outDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        returnDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        devolutionDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'lends',
        timestamps: false,
      },
    );
  }

  public static buildFromDomainModel(lend: Lend): LendEntitySequelize {
    return new LendEntitySequelize({
      id: lend.id || crypto.randomUUID(),
      bookId: lend.bookId,
      studentId: lend.studentId,
      outDate: lend.outDate,
      returnDate: lend.returnDate,
      devolutionDate: lend.devolutionDate,
    });
  }
}
