import { Injectable, Logger } from '@nestjs/common';
import { HashUtils } from 'lib-test-herbert';
import { UsuarioPrismaRepository } from '@/src/infrastructure/repository/usuario-prisma.repository';
import { Validator } from '@/src/core/interfaces/validator.interface';
import { EnumSituacaoUsuario } from '@/src/domain/enum/usuario-situacao.enum';
import { Usuario } from '@/src/domain/entity/usuario';

type ValidateUsuarioProps = {
  email: string;
  senha: string;
};

@Injectable()
export class AuthUsuarioValidator
  implements Validator<ValidateUsuarioProps, Usuario>
{
  constructor(
    private readonly logger: Logger,
    private readonly usuarioRepository: UsuarioPrismaRepository,
  ) {}

  async validate({ email, senha }: ValidateUsuarioProps): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findByEmail(email);
    if (usuario) {
      const situacao = usuario.getSituacao();
      const matched = await HashUtils.comparaString(senha, usuario.getSenha());
      const canContinue = situacao === EnumSituacaoUsuario.ATIVO && matched;

      if (canContinue) {
        return usuario;
      }
      this.logger.error('Senha inválida ou usuário inativo');
      return null;
    }
    this.logger.error('Usuário inválido!');
    return null;
  }
}
