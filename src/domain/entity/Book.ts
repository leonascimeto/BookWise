import crypto from 'crypto';

export default class Book {
  private constructor(
    readonly id: string,
    readonly title: string,
    readonly author: string,
    readonly isbn: string,
    readonly genre: string,
    readonly quantity: number,
  ) {}

  static build(input: Input) {
    const { id, title, author, isbn, genre, quantity } = input;
    return id
      ? new Book(id, title, author, isbn, genre, quantity)
      : new Book(crypto.randomUUID(), title, author, isbn, genre, quantity);
  }
}

type Input = {
  id?: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  quantity: number;
};
