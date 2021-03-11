import { Router } from 'express';
import agendamentosRoutes from './agendamentos.routes';
import sessionsRoutes from './sessions.routes';
import usuariosRoutes from './usuarios.routes';

const routes = Router();

routes.use('/agendamentos', agendamentosRoutes);
routes.use('/usuarios', usuariosRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
