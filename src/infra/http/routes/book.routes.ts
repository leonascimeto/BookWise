import { Request, Response, Router } from 'express';

import RegisterBookFactory from '../../factory/RegisterBookFactory';
import RegisterBookController from '../controller/RegisterBookController';

const bookRoutes = Router();

bookRoutes.post('/', async (request: Request, response: Response) => {
  const bookFactory = RegisterBookFactory.create();
  const registerBookController = new RegisterBookController(bookFactory);
  const controller = await registerBookController.handle(request);
  return response.status(controller.status).json(controller.body);
});

export default bookRoutes;
