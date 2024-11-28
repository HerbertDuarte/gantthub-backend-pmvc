import { Injectable, Logger } from '@nestjs/common';
import { HashUtils } from 'lib-test-herbert';
import { UsuarioTypeOrmRepository } from 'src/infrastructure/repository/usuario-typeorm.repository';
import { Validator } from 'src/core/interfaces/validator.interface';
import { EnumSituacaoUsuario } from 'src/domain/enum/usuario-situacao.enum';
import { Usuario } from 'src/domain/entity/usuario';

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
    private readonly usuarioRepository: UsuarioTypeOrmRepository,
  ) {}

  async validate({ login, senha }: ValidateUsuarioProps): Promise<Usuario> {
    const usuario = await this.usuarioRepository.buscaPorLogin(login);
    if (usuario) {
      const situacao = usuario.getSituacao();
      const matched = await HashUtils.comparaString(senha, usuario.getSenha());
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
