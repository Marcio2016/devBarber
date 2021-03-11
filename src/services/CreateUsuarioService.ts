import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Usuario from '../models/Usuario';

interface Request {
  nome: string;
  email: string;
  senha: string;
}

class CreateUsuarioService {
  public async execute({ nome, email, senha }: Request): Promise<Usuario> {
    const repositorio = getRepository(Usuario);

    const usuarioExiste = await repositorio.findOne({
      where: { email },
    });

    if (usuarioExiste) {
      throw Error('Endereço de e-mail já em uso!');
    }

    const hashedSenha = await hash(senha, 8);

    const usuario = repositorio.create({
      nome,
      email,
      senha: hashedSenha,
    });

    await repositorio.save(usuario);

    return usuario;
  }
}

export default CreateUsuarioService;
