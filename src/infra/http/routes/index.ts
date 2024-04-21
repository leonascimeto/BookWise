import { Router } from 'express';

import bookRoutes from './book.routes';
import lendRoutes from './lend.routes';
import studentRoutes from './student.routes';

const routes = Router();
routes.use('/books', bookRoutes);
routes.use('/students', studentRoutes);
routes.use('/lends', lendRoutes);

export default routes;
