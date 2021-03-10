import { Router } from 'express';
import agendamentosRoutes from './agendamentos.routes';

const routes = Router();

routes.use('/agendamentos', agendamentosRoutes);

export default routes;
