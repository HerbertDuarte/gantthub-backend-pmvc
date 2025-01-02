import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { LoginResponseDto } from '../../../domain/application/dto/auth/login-response.dto';
import { Environment } from '../../env/environment';
export declare class LoginService {
    private readonly jwtService;
    private readonly config;
    constructor(jwtService: JwtService, config: ConfigService<Environment, true>);
    execute(request: Request, response?: Response): Promise<LoginResponseDto>;
}
