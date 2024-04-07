import crypto from 'crypto';

export default class Lend {
  static DAY_RETURN = 7;
  static QUANTITY_FOR_DEFINITION_BAN = 5;
  static MAXIMUM_LEND_PER_STUDENT = 1;

  private constructor(
    readonly id: string,
    readonly bookId: string,
    readonly studentId: string,
    readonly outDate: string,
    readonly returnDate?: string,
    readonly devolutionDate?: string,
  ) {
    if (this.devolutionDate) {
      this.devolutionDate = this.defineDevolutionDate();
    }
  }

  static build(input: Input) {
    const { id, bookId, studentId, outDate, returnDate, devolutionDate } = input;
    return id
      ? new Lend(id, bookId, studentId, outDate, returnDate, devolutionDate)
      : new Lend(crypto.randomUUID(), bookId, studentId, outDate, returnDate, devolutionDate);
  }

  studentAbleToLend(quantityLend: number) {
    if (quantityLend >= Lend.MAXIMUM_LEND_PER_STUDENT) throw new Error('Student not able to lend, maximum reached');
  }

  bookIsDisponible(quantityLend: number, quantityBook: number) {
    if (quantityLend >= quantityBook) throw new Error('Book is not available');
  }

  private defineDevolutionDate() {
    const date = new Date(this.outDate);
    date.setDate(date.getDate() + Lend.DAY_RETURN);
    return date.toISOString();
  }
}

type Input = {
  id?: string;
  bookId: string;
  studentId: string;
  outDate: string;
  returnDate?: string;
  devolutionDate?: string;
};
