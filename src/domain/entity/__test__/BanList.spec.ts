import BanList from '../BanList';

describe('BanList', () => {
  test('should create a ban list', () => {
    const payload = {
      lendId: 'lendId',
      studentId: 'studentId',
    };

    const sut = BanList.build(payload);

    expect(sut).toBeInstanceOf(BanList);
    expect(sut.id).toBeDefined();
    expect(sut.lendId).toBe(payload.lendId);
    expect(sut.studentId).toBe(payload.studentId);
  });

  test('should restore a ban list', () => {
    const payload = {
      id: 'id',
      lendId: 'lendId',
      studentId: 'studentId',
    };

    const sut = BanList.build(payload);

    expect(sut).toBeInstanceOf(BanList);
    expect(sut.id).toBe(payload.id);
    expect(sut.lendId).toBe(payload.lendId);
    expect(sut.studentId).toBe(payload.studentId);
  });
});
