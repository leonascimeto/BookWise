import crypto from 'crypto';
import { DataTypes, Model, Sequelize } from 'sequelize';

import Student from '../../../../domain/entity/Student';

export class StudentEntitySequelize extends Model {
  public id!: string;
  public name!: string;
  public matriculation!: string;

  public static initModel(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        matriculation: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        tableName: 'students',
        timestamps: false,
      },
    );
  }

  public static buildFromDomainModel(student: Student): StudentEntitySequelize {
    return new StudentEntitySequelize({
      id: student.id || crypto.randomUUID(),
      name: student.name,
      matriculation: student.matriculation,
    });
  }
}
