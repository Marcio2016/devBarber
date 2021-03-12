import { getRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Usuario from '../models/Usuario';
import auth from '../config/auth';

interface Request {
  email: string;
  senha: string;
}

interface Response {
  usuario: Usuario;
  token: string;
}

class AuthService {
  public async execute({ email, senha }: Request): Promise<Response> {
    const usuarioRepositorio = getRepository(Usuario);

    const usuario = await usuarioRepositorio.findOne({ where: { email } });

    if (!usuario) {
      throw Error('E-mail ou senha inválidos');
    }

    const senhaEncontrada = await compare(senha, usuario.senha);

    if (!senhaEncontrada) {
      throw Error('E-mail ou senha inválidos');
    }

    const token = sign({}, auth.jwt.secret, {
      subject: usuario.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return { usuario, token };
  }
}

export default AuthService;
