import { Controller, Logger, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginService } from '../service/login.service';
import { AutenticaUsuarioDto } from '../../../domain/application/dto/auth/autentica-usuario.dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { Request, Response } from 'express';

@Controller('auth')
@ApiTags('Autenticação')
export class AuthController {
  constructor(
    private readonly logger: Logger,
    private readonly loginService: LoginService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    description: 'Dados para login',
    type: AutenticaUsuarioDto,
  })
  async login(@Req() req: Request, @Res() res: Response) {
    this.logger.debug('Login realizado no sistema!');
    return this.loginService.execute(req, res);
  }
}
