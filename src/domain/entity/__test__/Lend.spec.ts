import Lend from '../Lend';

describe('Lend', () => {
  test('should create a lend', () => {
    const payload = {
      bookId: 'bookId',
      studentId: 'studentId',
      outDate: '2024-04-07',
    };

    const sut = Lend.build(payload);

    expect(sut).toBeInstanceOf(Lend);
    expect(sut.id).toBeDefined();
    expect(sut.bookId).toBe(payload.bookId);
    expect(sut.studentId).toBe(payload.studentId);
    expect(sut.outDate).toBe(payload.outDate);
  });

  test('should create a lend with return date', () => {
    const payload = {
      bookId: 'bookId',
      studentId: 'studentId',
      outDate: '2024-04-07',
      returnDate: '2024-04-14',
    };

    const sut = Lend.build(payload);

    expect(sut).toBeInstanceOf(Lend);
    expect(sut.id).toBeDefined();
    expect(sut.bookId).toBe(payload.bookId);
    expect(sut.studentId).toBe(payload.studentId);
    expect(sut.outDate).toBe(payload.outDate);
    expect(sut.returnDate).toBe(payload.returnDate);
  });

  test('should throw an error when student not able to lend', () => {
    const payload = {
      bookId: 'bookId',
      studentId: 'studentId',
      outDate: '2024-04-07',
    };

    const sut = Lend.build(payload);

    expect(() => sut.studentAbleToLend(1)).toThrow('Student not able to lend, maximum reached');
  });

  test('should throw an error when book is not available', () => {
    const payload = {
      bookId: 'bookId',
      studentId: 'studentId',
      outDate: '2024-04-07',
    };

    const sut = Lend.build(payload);

    expect(() => sut.bookIsDisponible(1, 1)).toThrow('Book is not available');
  });
});
