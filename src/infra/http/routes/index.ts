import { Router } from 'express';

import bookRoutes from './book.routes';

const routes = Router();
routes.use('/books', bookRoutes);
export default routes;
