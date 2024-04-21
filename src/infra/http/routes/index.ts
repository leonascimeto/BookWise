import { Router } from 'express';

import bookRoutes from './book.routes';
import studentRoutes from './student.routes';

const routes = Router();
routes.use('/books', bookRoutes);
routes.use('/students', studentRoutes);
export default routes;
