import { Router } from 'express';
import mpesRouter from './mpes.routes';
import sessionsMpeRouter from './sessionsMpe.routes';
import sessionsTradingRouter from './sessionsTrading.routes';
import tradingsRouter from './tradings.routes';

const routes = Router();

routes.use('/tradings', tradingsRouter);
routes.use('/mpes', mpesRouter);
routes.use('/sessionsTrading', sessionsTradingRouter);
routes.use('/sessionsMpe', sessionsMpeRouter);

export default routes;
