import { Logger } from '@nestjs/common';
import { LoginService } from '../service/login.service';
import { Request } from 'express';
export declare class AuthController {
    private readonly logger;
    private readonly loginService;
    constructor(logger: Logger, loginService: LoginService);
    login(req: Request): Promise<import("../../../domain/application/dto/auth/login-response.dto").LoginResponseDto>;
}
