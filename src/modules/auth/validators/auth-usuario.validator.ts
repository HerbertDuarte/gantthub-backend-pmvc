import { Injectable, Logger } from '@nestjs/common';
import { HashUtils } from 'lib-test-herbert';
import { UsuarioRepository } from 'src/modules/usuarios/repository/usuario.repository';
import { Validator } from 'src/core/interfaces/validator.interface';
import { Usuario } from '@prisma/client';
import { EnumSituacaoUsuario } from 'src/modules/usuarios/enum/usuario-situacao.enum';

type ValidateUsuarioProps = {
  login: string;
  senha: string;
};

@Injectable()
export class AuthUsuarioValidator
  implements Validator<ValidateUsuarioProps, Usuario>
{
  constructor(
    private readonly logger: Logger,
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async validate({ login, senha }: ValidateUsuarioProps): Promise<Usuario> {
    const usuario = await this.usuarioRepository.buscaPorLogin(login);
    if (usuario) {
      const { situacao } = usuario;
      const matched = await HashUtils.comparaString(senha, usuario.senha);
      if (matched && situacao === EnumSituacaoUsuario.ATIVO) {
        return usuario;
      } else {
        this.logger.error('Senha inválida ou usuário inativo');
        return null;
      }
    }
    this.logger.error('Usuário inválido!');
    return null;
  }
}
