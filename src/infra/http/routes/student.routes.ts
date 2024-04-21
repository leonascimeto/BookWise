import { Request, Response, Router } from 'express';

import RegisterStudentFactory from '../../factory/RegisterStudentFactory';
import RegisterStudentController from '../controller/RegisterStudentController';

const studentRoutes = Router();

studentRoutes.post('/', async (request: Request, response: Response) => {
  const registerStudentFactory = RegisterStudentFactory.create();
  const registerStudentController = new RegisterStudentController(registerStudentFactory);
  const controller = await registerStudentController.handle(request);
  return response.status(controller.status).json(controller.body);
});

export default studentRoutes;
