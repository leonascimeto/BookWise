import Student from '../Student';

describe('Student', () => {
  test('should restore a student', () => {
    const payload = {
      id: 'id',
      name: 'name',
      matriculation: 'matriculation',
    };

    const sut = Student.build(payload);

    expect(sut).toBeInstanceOf(Student);
    expect(sut.id).toBe(payload.id);
    expect(sut.name).toBe(payload.name);
    expect(sut.matriculation).toBe(payload.matriculation);
  });

  test('should create a student', () => {
    const payload = {
      name: 'name',
      matriculation: 'matriculation',
    };

    const sut = Student.build(payload);

    expect(sut).toBeInstanceOf(Student);
    expect(sut.id).toBeDefined();
    expect(sut.name).toBe(payload.name);
    expect(sut.matriculation).toBe(payload.matriculation);
  });
});
