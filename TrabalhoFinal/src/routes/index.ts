import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  const { name } = request.body;

  return response.json({ ok: true });
});

export default routes;
