import { Request, Response, Router } from 'express';

import FindPeendingLendsFactory from '../../factory/FindPeendingLendsFactory';
import LendBookFactory from '../../factory/LendBookFactory';
import RefundBookFactory from '../../factory/RefundBookFactory';
import FindPeendingLendsController from '../controller/FindPeendingLendsController';
import LendBookController from '../controller/LendBookController';
import RefundBookController from '../controller/RefundBookController';

const lendRouter = Router();

lendRouter.post('/', async (request: Request, response: Response) => {
  const lendBookFactory = LendBookFactory.create();
  const lendBookController = new LendBookController(lendBookFactory);
  const controller = await lendBookController.handle(request);
  return response.status(controller.status).json(controller.body);
});

lendRouter.get('/peending', async (_request: Request, response: Response) => {
  const findPeendingLendsFactory = FindPeendingLendsFactory.create();
  const findPeendingLendsController = new FindPeendingLendsController(findPeendingLendsFactory);
  const controller = await findPeendingLendsController.handle();
  return response.status(controller.status).json(controller.body);
});

lendRouter.patch('/:lendId/refund', async (request: Request, response: Response) => {
  const refundLendFactory = RefundBookFactory.create();
  const refundBookController = new RefundBookController(refundLendFactory);
  const controller = await refundBookController.handle(request);
  return response.status(controller.status).json(controller.body);
});

export default lendRouter;
