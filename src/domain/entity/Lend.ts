import crypto from 'crypto';

import BanList from './BanList';

export default class Lend {
  static readonly DAY_RETURN = 7;
  static readonly QUANTITY_FOR_DEFINITION_BAN = 5;
  static readonly MAXIMUM_LEND_PER_STUDENT = 1;
  returnDate?: string | null;

  private constructor(
    readonly id: string,
    readonly bookId: string,
    readonly studentId: string,
    readonly outDate: string,
    returnDate?: string | null,
    readonly devolutionDate?: string,
  ) {
    this.devolutionDate = devolutionDate ?? this.defineDevolutionDate();
    this.returnDate = returnDate ?? null;
  }

  static build(input: Input) {
    const { id, bookId, studentId, outDate, returnDate, devolutionDate } = input;
    return id
      ? new Lend(id, bookId, studentId, outDate, returnDate, devolutionDate)
      : new Lend(crypto.randomUUID(), bookId, studentId, outDate, returnDate, devolutionDate);
  }

  studentAbleToLend(input: { quantityLend: number; studentBanList: BanList[] }) {
    const { quantityLend, studentBanList } = input;
    if (quantityLend >= Lend.MAXIMUM_LEND_PER_STUDENT) throw new Error('Student not able to lend, maximum reached');
    if (studentBanList.length >= Lend.QUANTITY_FOR_DEFINITION_BAN) throw new Error('Student banned');
    for (const ban of studentBanList) {
      if (!ban.expiredAt) continue;
      if (new Date(ban.expiredAt) > new Date(this.outDate)) throw new Error('Student is in penalty period');
    }
  }

  bookIsDisponible(quantityLend: number, quantityBook: number) {
    if (quantityLend >= quantityBook) throw new Error('Book is not available');
  }

  private defineDevolutionDate() {
    const date = new Date(this.outDate);
    date.setDate(date.getDate() + Lend.DAY_RETURN);
    return date.toISOString();
  }

  refundBook(refundDate: string) {
    this.returnDate = refundDate;
  }

  isLateDevolution() {
    if (!this.returnDate || !this.devolutionDate) return false;
    return new Date(this.devolutionDate) < new Date(this.returnDate);
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
