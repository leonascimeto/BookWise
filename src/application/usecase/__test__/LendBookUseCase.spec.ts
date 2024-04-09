import LendBookUseCase from '../LendBookUseCase';

describe('LendBookUseCase', () => {
  const bookRepository = {
    findById: jest.fn(),
    save: jest.fn(),
    search: jest.fn(),
    existsISBN: jest.fn(),
  };

  const studentRepository = {
    findById: jest.fn(),
    save: jest.fn(),
    matriculationExists: jest.fn(),
  };

  const lendRepository = {
    countPeendingLendByBookId: jest.fn(),
    countPeendingLendByStudentId: jest.fn(),
    save: jest.fn(),
    findById: jest.fn(),
    findPendingLends: jest.fn(),
  };

  const banListRepository = {
    save: jest.fn(),
    findById: jest.fn(),
    findByStudent: jest.fn(),
    existsLend: jest.fn(),
  };

  const book = {
    id: 'any_id',
    title: 'title',
    author: 'author',
    isbn: 'isbn',
    genre: 'genre',
    quantity: 1,
  };

  const student = {
    id: 'any_id',
    name: 'any_name',
    matriculation: 'any_matriculation',
  };

  test('should lend a book', async () => {
    bookRepository.findById.mockResolvedValue(book);
    studentRepository.findById.mockResolvedValue(student);
    lendRepository.countPeendingLendByBookId.mockResolvedValue(0);
    lendRepository.countPeendingLendByStudentId.mockResolvedValue(0);
    banListRepository.findByStudent.mockResolvedValue([]);

    const sut = new LendBookUseCase(bookRepository, studentRepository, lendRepository, banListRepository);

    expect(await sut.execute({ bookId: book.id, studentId: student.id, outDate: '2024-04-07' })).toBeUndefined();
  });

  test('should throw an error when book is not available', async () => {
    bookRepository.findById.mockResolvedValue(book);
    studentRepository.findById.mockResolvedValue(student);
    lendRepository.countPeendingLendByBookId.mockResolvedValue(1);
    lendRepository.countPeendingLendByStudentId.mockResolvedValue(0);

    const sut = new LendBookUseCase(bookRepository, studentRepository, lendRepository, banListRepository);

    await expect(sut.execute({ bookId: book.id, studentId: student.id, outDate: '2024-04-07' })).rejects.toThrow(
      'Book is not available',
    );
  });

  test('should throw an error when student not able to lend', async () => {
    bookRepository.findById.mockResolvedValue(book);
    studentRepository.findById.mockResolvedValue(student);
    lendRepository.countPeendingLendByBookId.mockResolvedValue(0);
    lendRepository.countPeendingLendByStudentId.mockResolvedValue(1);

    const sut = new LendBookUseCase(bookRepository, studentRepository, lendRepository, banListRepository);

    await expect(sut.execute({ bookId: book.id, studentId: student.id, outDate: '2024-04-07' })).rejects.toThrow(
      'Student not able to lend, maximum reached',
    );
  });

  test('should throw an error when student is in penalty ban', async () => {
    bookRepository.findById.mockResolvedValue(book);
    studentRepository.findById.mockResolvedValue(student);
    lendRepository.countPeendingLendByBookId.mockResolvedValue(0);
    lendRepository.countPeendingLendByStudentId.mockResolvedValue(0);
    banListRepository.findByStudent.mockResolvedValue([
      {
        id: 'any_id',
        studentId: student.id,
        expiredAt: '2024-04-08',
      },
    ]);
    const sut = new LendBookUseCase(bookRepository, studentRepository, lendRepository, banListRepository);

    await expect(sut.execute({ bookId: book.id, studentId: student.id, outDate: '2024-04-07' })).rejects.toThrow(
      'Student is in penalty period',
    );
  });

  test('should throw an error when book not found', async () => {
    bookRepository.findById.mockResolvedValue(null);

    const sut = new LendBookUseCase(bookRepository, studentRepository, lendRepository, banListRepository);

    await expect(sut.execute({ bookId: book.id, studentId: student.id, outDate: '2024-04-07' })).rejects.toThrow(
      'Book not found',
    );
  });

  test('should throw an error when student not found', async () => {
    bookRepository.findById.mockResolvedValue(book);
    studentRepository.findById.mockResolvedValue(null);

    const sut = new LendBookUseCase(bookRepository, studentRepository, lendRepository, banListRepository);

    await expect(sut.execute({ bookId: book.id, studentId: student.id, outDate: '2024-04-07' })).rejects.toThrow(
      'Student not found',
    );
  });
});
