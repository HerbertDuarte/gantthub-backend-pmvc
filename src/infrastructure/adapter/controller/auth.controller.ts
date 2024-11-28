import { Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginUseCase } from '../../../domain/application/usecases/auth/login.usecase';
import { AutenticaUsuarioDto } from '../../../domain/application/dto/auth/autentica-usuario.dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { Request } from 'express';

@Controller('')
@ApiTags('Autenticação')
export class AuthController {
  constructor(
    private readonly logger: Logger,
    private loginUseCase: LoginUseCase,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({
    description: 'Dados para login',
    type: AutenticaUsuarioDto,
  })
  async login(@Req() req: Request) {
    this.logger.debug('Login realizado no sistema!');
    return this.loginUseCase.execute(req.user);
  }
}
