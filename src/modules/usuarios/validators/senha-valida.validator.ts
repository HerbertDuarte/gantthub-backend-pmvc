import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { HashUtils } from 'lib-test-herbert';
import { AtualizaPerfilUsuarioDto } from '../dto/atualiza-perfil.dto';
import { Usuario } from '@prisma/client';

@Injectable()
export class SenhaValidaValidator {
  private readonly logger = new Logger(SenhaValidaValidator.name);

  async validate(
    usuario: Usuario,
    { senhaAntiga, senhaNova }: AtualizaPerfilUsuarioDto,
  ): Promise<void> {
    if (senhaNova) {
      if (!senhaAntiga) {
        throw new ConflictException(
          'É necessário passar a senha antiga para atualizar a senha.',
        );
      }

      const senhaCorreta = await HashUtils.comparaString(
        senhaAntiga,
        usuario.senha,
      );
      if (!senhaCorreta) {
        this.logger.error(
          'Senha antiga incorreta ao tentar atualizar usuário.',
        );
        throw new ConflictException('Senha  antiga incorreta.');
      }
    }
  }
}
