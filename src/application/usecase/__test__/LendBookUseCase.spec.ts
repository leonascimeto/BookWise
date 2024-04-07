import LendBookUseCase from '../LendBookUseCase';

describe('LendBookUseCase', () => {
  const bookRepository = {
    findById: jest.fn(),
    save: jest.fn(),
    search: jest.fn(),
  };

  const studentRepository = {
    findById: jest.fn(),
    save: jest.fn(),
  };

  const lendRepository = {
    countLendByBookId: jest.fn(),
    countLendByStudentId: jest.fn(),
    save: jest.fn(),
    findById: jest.fn(),
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
    lendRepository.countLendByBookId.mockResolvedValue(0);
    lendRepository.countLendByStudentId.mockResolvedValue(0);

    const sut = new LendBookUseCase(bookRepository, studentRepository, lendRepository);

    expect(await sut.execute({ bookId: book.id, studentId: student.id, outDate: '2024-04-07' })).toBeUndefined();
  });

  test('should throw an error when book is not available', async () => {
    bookRepository.findById.mockResolvedValue(book);
    studentRepository.findById.mockResolvedValue(student);
    lendRepository.countLendByBookId.mockResolvedValue(1);
    lendRepository.countLendByStudentId.mockResolvedValue(0);

    const sut = new LendBookUseCase(bookRepository, studentRepository, lendRepository);

    await expect(sut.execute({ bookId: book.id, studentId: student.id, outDate: '2024-04-07' })).rejects.toThrow(
      'Book is not available',
    );
  });

  test('should throw an error when student not able to lend', async () => {
    bookRepository.findById.mockResolvedValue(book);
    studentRepository.findById.mockResolvedValue(student);
    lendRepository.countLendByBookId.mockResolvedValue(0);
    lendRepository.countLendByStudentId.mockResolvedValue(1);

    const sut = new LendBookUseCase(bookRepository, studentRepository, lendRepository);

    await expect(sut.execute({ bookId: book.id, studentId: student.id, outDate: '2024-04-07' })).rejects.toThrow(
      'Student not able to lend, maximum reached',
    );
  });
});
