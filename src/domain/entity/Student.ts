import crypto from 'crypto';

export default class Student {
  private constructor(
    readonly id: string,
    readonly name: string,
    readonly matriculation: string,
  ) {}

  static build(input: Input) {
    const { id, name, matriculation } = input;
    return id ? new Student(id, name, matriculation) : new Student(crypto.randomUUID(), name, matriculation);
  }
}

type Input = {
  id?: string;
  name: string;
  matriculation: string;
};
