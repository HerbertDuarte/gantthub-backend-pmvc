import { randomUUID } from 'crypto';
import { EnumSituacaoUsuario } from '../enum/usuario-situacao.enum';
import { isHash } from 'lib/string/is-hash';
import { hashSync } from 'bcryptjs';
import { isEmail } from 'lib/string/is-email';
import { hasSymbols } from 'lib/string/has-symbols';
import { hasUppercase } from 'lib/string/has-uppercase';
import { hasLowercase } from 'lib/string/has-lower-case';
import { hasNumber } from 'lib/string/has-number';

type UsuarioProps = {
  id?: string;
  nome: string;
  email: string;
  situacao?: EnumSituacaoUsuario;
  login: string;
  senha: string;
  createdAt?: Date;
  imageUrl?: string;
};

export class Usuario {
  private id: string;
  private nome: string;
  private email: string;
  private situacao: EnumSituacaoUsuario;
  private login: string;
  private senha: string;
  private imageUrl: string;
  private createdAt: Date;

  constructor(props: UsuarioProps) {
    this.validate(props);
    this.imageUrl = props.imageUrl ?? null;
    this.id = props.id ?? randomUUID();
    this.nome = props.nome;
    this.email = props.email;
    this.situacao = props.situacao ?? EnumSituacaoUsuario.ATIVO;
    this.login = props.login;
    this.setSenha(props.senha);
    this.createdAt = props.createdAt ?? new Date();
  }

  private setSenha(senha: string) {
    if (isHash(senha)) {
      this.senha = senha;
      return;
    }
    this.senha = hashSync(senha);
  }

  private validate(props: UsuarioProps) {
    this.validateEmail(props.email);
    this.validateLogin(props.login);
    this.validatePassword(props.senha);
  }

  private validatePassword(senha: string) {
    if (senha.length < 8) {
      throw new Error('Senha deve ter no mínimo 8 caracteres.');
    }

    if (!hasSymbols(senha)) {
      throw new Error('Senha deve conter caracteres especiais.');
    }

    if (!hasUppercase(senha)) {
      throw new Error('Senha deve conter pelo menos uma letra maiúscula.');
    }

    if (!hasLowercase(senha)) {
      throw new Error('Senha deve conter pelo menos uma letra minúscula.');
    }

    if (!hasNumber(senha)) {
      throw new Error('Senha deve conter pelo menos um número.');
    }
  }

  private validateEmail(email: string) {
    if (!isEmail(email)) {
      throw new Error('Email inválido.');
    }
  }

  private validateLogin(login: string) {
    if (hasSymbols(login)) {
      throw new Error('Login não pode conter caracteres especiais.');
    }

    if (login.length < 4) {
      throw new Error('Login deve ter no mínimo 4 caracteres.');
    }
  }

  public getId = () => this.id;
  public getNome = () => this.nome;
  public getEmail = () => this.email;
  public getSituacao = () => this.situacao;
  public getLogin = () => this.login;
  public getSenha = () => this.senha;
  public getCreatedAt = () => this.createdAt;
}
