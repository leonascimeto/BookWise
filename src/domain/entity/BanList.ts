import crypto from 'crypto';

export default class BanList {
  static DAYS_TO_EXPIRE = 15;
  private constructor(
    readonly id: string,
    readonly lendId: string,
    readonly studentId: string,
    readonly expiredAt?: string,
  ) {
    this.expiredAt = expiredAt || this.defineExpiredAt();
  }

  static build(input: Input) {
    const { id, lendId, studentId, expiredAt } = input;

    return id
      ? new BanList(id, lendId, studentId, expiredAt)
      : new BanList(crypto.randomUUID(), lendId, studentId, expiredAt);
  }

  private defineExpiredAt() {
    const date = new Date();
    date.setDate(date.getDate() + BanList.DAYS_TO_EXPIRE);
    return date.toISOString();
  }
}

type Input = {
  id?: string;
  lendId: string;
  studentId: string;
  expiredAt?: string;
};
