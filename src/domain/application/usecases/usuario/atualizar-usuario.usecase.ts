import { Injectable, ConflictException } from '@nestjs/common';
import { HashUtils } from 'lib-test-herbert';
import { UseCase } from 'src/core/interfaces/usecase.interface';
import { UsuarioEntity } from 'src/domain/entity/usuario.entity';
import { UsuarioTypeOrmRepository } from 'src/infrastructure/repository/usuario-typeorm.repository';
import { AtualizaUsuarioDto } from '../../dto/usuario/atualiza-usuario.dto';
import { CriaUsuarioDto } from '../../dto/usuario/cria-usuario.dto';
import { SenhaValidaValidator } from '../../validators/senha-valida.validator';
import { UpdateUsuarioValidator } from '../../validators/update-usuario.validator';

@Injectable()
export class AtualizarUsuarioUseCase implements UseCase<UsuarioEntity> {
  constructor(
    private readonly usuarioRepository: UsuarioTypeOrmRepository,
    private readonly updateUsuarioValidator: UpdateUsuarioValidator,
    private readonly senhaValidaValidator: SenhaValidaValidator,
  ) {}

  async execute(id: string, data: AtualizaUsuarioDto): Promise<void> {
    const usuarioExists = await this.usuarioRepository.buscaPorId(id);
    if (!usuarioExists) throw new ConflictException('Usuário não encontrado.');

    const atualizaUsuarioPayload: Partial<CriaUsuarioDto> = data;

    const atualizaSenha = data.senhaNova;

    if (atualizaSenha) {
      await this.senhaValidaValidator.validate(usuarioExists, data);
      atualizaUsuarioPayload.senha = await HashUtils.hashString(data.senhaNova);
    }

    await this.updateUsuarioValidator.validate(
      usuarioExists,
      atualizaUsuarioPayload,
    );

    const usuario = new UsuarioEntity({
      id: usuarioExists.getId(),
      email: usuarioExists.getEmail(),
      nome: usuarioExists.getNome(),
      login: usuarioExists.getLogin(),
      createdAt: usuarioExists.getCreatedAt(),
      deletedAt: usuarioExists.getDeletedAt(),
      updatedAt: new Date(),
      senha: usuarioExists.getSenha(),
      situacao: usuarioExists.getSituacao(),
      ...atualizaUsuarioPayload,
    });

    await this.usuarioRepository.atualiza(id, usuario);
  }
}
