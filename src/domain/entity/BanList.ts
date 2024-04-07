import crypto from 'crypto';

export default class BanList {
  private constructor(
    readonly id: string,
    readonly lendId: string,
    readonly studentId: string,
  ) {}

  static build(input: Input) {
    const { id, lendId, studentId } = input;
    return id ? new BanList(id, lendId, studentId) : new BanList(crypto.randomUUID(), lendId, studentId);
  }
}

type Input = {
  id?: string;
  lendId: string;
  studentId: string;
};
