import Student from '../../domain/entity/Student';

export default interface StudentRepository {
  save(student: Student): Promise<void>;
  findById(id: string): Promise<Student>;
}
