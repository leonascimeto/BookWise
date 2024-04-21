import crypto from 'crypto';
import { DataTypes, Model, Sequelize } from 'sequelize';

import Book from '../../../../domain/entity/Book';

export class BookEntitySquelize extends Model {
  id!: string;
  title!: string;
  author!: string;
  isbn!: string;
  genre!: string;
  quantity!: number;

  public static initModel(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        author: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isbn: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        genre: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'books',
        timestamps: false,
      },
    );
  }

  public static buildFromDomainModel(book: Book): BookEntitySquelize {
    return new BookEntitySquelize({
      id: book.id || crypto.randomUUID(),
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      genre: book.genre,
      quantity: book.quantity,
    });
  }
}
