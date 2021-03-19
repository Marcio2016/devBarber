import path from 'path';
import { getRepository } from 'typeorm';
import fs from 'fs';
import Usuario from '../models/Usuario';
import uploadConfig from '../config/uploads';

interface Request {
  usuario_id: string;
  file_name: string;
}

class UpdateAvatarService {
  public async execute({ usuario_id, file_name }: Request): Promise<Usuario> {
    const usuarioRepository = getRepository(Usuario);

    const usuario = await usuarioRepository.findOne(usuario_id);

    if (!usuario) {
      throw new Error('Apenas usuários autenticados podem trocar de avatar');
    }

    if (usuario.avatar) {
      const usuarioFilePath = path.join(uploadConfig.diretorio, usuario.avatar);
      const avatarExiste = await fs.promises.stat(usuarioFilePath);

      if (avatarExiste) {
        await fs.promises.unlink(usuarioFilePath);
      }
    }

    usuario.avatar = file_name;
    await usuarioRepository.save(usuario);

    return usuario;
  }
}

export default UpdateAvatarService;
