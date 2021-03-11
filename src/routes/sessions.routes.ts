import { Router } from 'express';
import AuthService from '../services/AuthService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
  try {
    const { email, senha } = request.body;

    const service = new AuthService();

    const { usuario, token } = await service.execute({
      email,
      senha,
    });

    return response.json({ usuario, token });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default sessionsRoutes;
