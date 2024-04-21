import RegisterStudentUseCase from '../../application/usecase/RegisterStudentUseCase';
import StudentSequelizeRepository from '../db/sequelize/repository/StudentSequelizeRepository';

export default class RegisterStudentFactory {
  static create() {
    const studentRepository = new StudentSequelizeRepository();
    return new RegisterStudentUseCase(studentRepository);
  }
}
