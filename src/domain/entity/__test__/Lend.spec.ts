import BanList from '../BanList';
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

  test('should throw an error when student already have a lend', () => {
    const payload = {
      bookId: 'bookId',
      studentId: 'studentId',
      outDate: '2024-04-07',
    };

    const sut = Lend.build(payload);

    expect(() => sut.studentAbleToLend({ quantityLend: 1, studentBanList: [] })).toThrow(
      'Student not able to lend, maximum reached',
    );
  });

  test('should throw an error when student is in an penalty period', () => {
    const payload = {
      bookId: 'bookId',
      studentId: 'studentId',
      outDate: '2024-04-07',
    };

    const studentBanList: BanList[] = [
      BanList.build({ lendId: 'any_id3', studentId: 'studentId', expiredAt: '2024-04-15' }),
      BanList.build({ lendId: 'any_id4', studentId: 'studentId', expiredAt: '2024-01-08' }),
      BanList.build({ lendId: 'any_id5', studentId: 'studentId', expiredAt: '2024-01-01' }),
    ];

    const sut = Lend.build(payload);

    expect(() => sut.studentAbleToLend({ quantityLend: 0, studentBanList })).toThrow('Student is in penalty period');
  });

  test('should throw an error when student is banned', () => {
    const payload = {
      bookId: 'bookId',
      studentId: 'studentId',
      outDate: '2024-04-07',
    };

    const studentBanList: BanList[] = [
      BanList.build({ lendId: 'any_id3', studentId: 'studentId', expiredAt: '2024-04-01' }),
      BanList.build({ lendId: 'any_id4', studentId: 'studentId', expiredAt: '2024-01-08' }),
      BanList.build({ lendId: 'any_id5', studentId: 'studentId', expiredAt: '2024-02-01' }),
      BanList.build({ lendId: 'any_id5', studentId: 'studentId', expiredAt: '2024-03-01' }),
      BanList.build({ lendId: 'any_id5', studentId: 'studentId', expiredAt: '2023-12-01' }),
    ];

    const sut = Lend.build(payload);

    expect(() => sut.studentAbleToLend({ quantityLend: 0, studentBanList })).toThrow('Student banned');
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
