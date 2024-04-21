import { Request, Response, Router } from 'express';

import RegisterBookFactory from '../../factory/RegisterBookFactory';
import SearchBookFactory from '../../factory/SearchBookFactory';
import RegisterBookController from '../controller/RegisterBookController';
import SearchBooksController from '../controller/SearchBooksController';

const bookRoutes = Router();

bookRoutes.post('/', async (request: Request, response: Response) => {
  const registerBookFactory = RegisterBookFactory.create();
  const registerBookController = new RegisterBookController(registerBookFactory);
  const controller = await registerBookController.handle(request);
  return response.status(controller.status).json(controller.body);
});

bookRoutes.get('/', async (request: Request, response: Response) => {
  const searchBooksFactory = SearchBookFactory.create();
  const searchBooksController = new SearchBooksController(searchBooksFactory);
  const controller = await searchBooksController.handle(request);
  return response.status(controller.status).json(controller.body);
});

export default bookRoutes;
