import { Router } from 'express';
import CreateUsuarioService from '../services/CreateUsuarioService';

const usuariosRoutes = Router();

usuariosRoutes.post('/', async (request, response) => {
  try {
    const { nome, email, senha } = request.body;

    const service = new CreateUsuarioService();

    const usuario = await service.execute({
      nome,
      email,
      senha,
    });

    // @ts-expect-error tratando erro
    delete usuario.senha;

    return response.json(usuario);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usuariosRoutes;
