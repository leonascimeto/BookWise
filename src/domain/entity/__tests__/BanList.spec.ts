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
    expect(sut.expiredAt).toBeDefined();
  });

  test('should restore a ban list', () => {
    const payload = {
      id: 'id',
      lendId: 'lendId',
      studentId: 'studentId',
      expiredAt: '2024-04-07',
    };

    const sut = BanList.build(payload);

    expect(sut).toBeInstanceOf(BanList);
    expect(sut.id).toBe(payload.id);
    expect(sut.lendId).toBe(payload.lendId);
    expect(sut.studentId).toBe(payload.studentId);
    expect(sut.expiredAt).toBe(payload.expiredAt);
  });
});
