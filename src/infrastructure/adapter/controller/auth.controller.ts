import { Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { LoginService } from '../service/login.service';
import { LocalAuthGuard } from '../guard/local-auth.guard';

@Controller('auth')
@ApiTags('Autenticação')
export class AuthController {
  constructor(
    private readonly logger: Logger,
    private readonly loginService: LoginService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    this.logger.debug('Login realizado no sistema!');
    return this.loginService.execute(req);
  }
}
