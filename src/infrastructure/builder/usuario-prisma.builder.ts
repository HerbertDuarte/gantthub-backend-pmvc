import { hasLowercase } from '@/src/lib/string/has-lower-case';
import { hasNumber } from '@/src/lib/string/has-number';
import { hasSymbols } from '@/src/lib/string/has-symbols';
import { hasUppercase } from '@/src/lib/string/has-uppercase';
import { isHash } from '@/src/lib/string/is-hash';
import { BadRequestException } from '@nestjs/common';
import { UsuarioPrisma } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import { isEmail } from 'class-validator';

class Input {
  id?: string;
  nome: string;
  email: string;
  login: string;
  senha: string;
  situacao?: number;
  role?: number;
  refreshToken?: string;
  imageUrl?: string;
  createdAt?: Date;
}

export class UsuarioPrismaBuilder {
  static build(data: Input): UsuarioPrisma {
    this.validate(data);
    return {
      email: data.email,
      login: data.login,
      nome: data.nome,
      senha: this.buildSenha(data.senha),
      createdAt: data.createdAt ?? new Date(),
      id: data.id ?? crypto.randomUUID(),
      refreshToken: data.refreshToken,
      role: data.role ?? 1,
      situacao: data.situacao ?? 1,
      imageUrl: data.imageUrl,
    };
  }

  private static buildSenha(senha: string) {
    if (!senha) return;
    if (isHash(senha)) {
      return senha;
    }
    return hashSync(senha);
  }

  private static validate(props: Input) {
    this.validateEmail(props.email);
    this.validateLogin(props.login);
    this.validatePassword(props.senha);
  }

  private static validatePassword(senha: string) {
    const ABILITAR_VALIDACAO_FORTE = false;
    const MIN_LENGTH = 6;
    if (senha && senha.length < MIN_LENGTH) {
      throw new BadRequestException(
        `Senha deve ter no mínimo ${MIN_LENGTH} caracteres.`,
      );
    }

    if (ABILITAR_VALIDACAO_FORTE && !hasSymbols(senha)) {
      throw new BadRequestException('Senha deve conter caracteres especiais.');
    }

    if (ABILITAR_VALIDACAO_FORTE && !hasUppercase(senha)) {
      throw new BadRequestException(
        'Senha deve conter pelo menos uma letra maiúscula.',
      );
    }

    if (ABILITAR_VALIDACAO_FORTE && !hasLowercase(senha)) {
      throw new BadRequestException(
        'Senha deve conter pelo menos uma letra minúscula.',
      );
    }

    if (ABILITAR_VALIDACAO_FORTE && !hasNumber(senha)) {
      throw new BadRequestException('Senha deve conter pelo menos um número.');
    }
  }

  private static validateEmail(email: string) {
    if (!isEmail(email)) {
      throw new BadRequestException('Email inválido.');
    }
  }

  private static validateLogin(login: string) {
    if (hasSymbols(login)) {
      throw new BadRequestException(
        'Login não pode conter caracteres especiais.',
      );
    }

    if (login.length < 4) {
      throw new BadRequestException('Login deve ter no mínimo 4 caracteres.');
    }
  }
}
