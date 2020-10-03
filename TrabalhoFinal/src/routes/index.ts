import { Router } from 'express';
import tradingsRouter from './tradings.routes';

const routes = Router();

routes.use('/tradings', tradingsRouter);

export default routes;
