import StudentRepository from '../../../../application/repository/StudentRepository';
import Student from '../../../../domain/entity/Student';
import { dbSequelize } from '..';

export default class StudentSequelizeRepository implements StudentRepository {
  private studentDao = dbSequelize.StudentEntitySequelize;
  async findById(id: string): Promise<Student> {
    try {
      const student = await this.studentDao.findByPk(id);
      if (!student) throw new Error('Student not found');
      return Student.build({
        id: student.id,
        name: student.name,
        matriculation: student.matriculation,
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error to find student');
    }
  }

  async matriculationExists(matriculation: string): Promise<boolean> {
    try {
      const student = await this.studentDao.findOne({ where: { matriculation } });
      return !!student;
    } catch (error) {
      console.error(error);
      throw new Error('Error to check if matriculation exists');
    }
  }

  async save(student: Student): Promise<void> {
    try {
      const dao = this.studentDao.buildFromDomainModel(student);
      await dao.save();
    } catch (error) {
      console.error(error);
      throw new Error('Error to save student');
    }
  }
}
