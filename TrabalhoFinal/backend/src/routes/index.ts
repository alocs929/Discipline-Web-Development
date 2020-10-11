import { Router } from 'express';
import mpesRouter from './mpes.routes';
import tradingsRouter from './tradings.routes';

const routes = Router();

routes.use('/tradings', tradingsRouter);
routes.use('/mpes', mpesRouter);

export default routes;
