import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/uploads';
import autenticacao from '../middlewares/Autenticacao';
import CreateUsuarioService from '../services/CreateUsuarioService';

const usuariosRoutes = Router();

const upload = multer(uploadConfig);

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

usuariosRoutes.patch(
  '/avatar',
  autenticacao,
  upload.single('avatar'),
  async (request, response) => {
    return response.json({ ok: true });
  },
);

export default usuariosRoutes;
