import { Injectable, Logger } from '@nestjs/common';
import { HashUtils } from 'lib-test-herbert';
import { UsuarioPrismaRepository } from '@/src/infrastructure/repository/usuario-prisma.repository';
import { Validator } from '@/src/core/interfaces/validator.interface';
import { EnumSituacaoUsuario } from '@/src/domain/enum/usuario-situacao.enum';
import { UsuarioPrisma } from '@prisma/client';

type ValidateUsuarioProps = {
  username: string;
  senha: string;
};

@Injectable()
export class AuthUsuarioValidator
  implements Validator<ValidateUsuarioProps, UsuarioPrisma>
{
  constructor(
    private readonly logger: Logger,
    private readonly usuarioRepository: UsuarioPrismaRepository,
  ) {}

  async validate({
    username,
    senha,
  }: ValidateUsuarioProps): Promise<UsuarioPrisma> {
    const usuario = await this.usuarioRepository.findByLogin(username);
    if (usuario) {
      const situacao = usuario.situacao;
      const matched = await HashUtils.comparaString(senha, usuario.senha);
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
