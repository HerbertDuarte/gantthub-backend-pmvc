import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsuarioJWTPayload } from '../../../domain/application/dto/auth/usuario-jwt-payload.dto';
import { UsuarioPrismaRepository } from 'src/infrastructure/repository/usuario-prisma.repository';
import { Usuario } from 'src/domain/entity/usuario';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usuarioRepository;
    private logger;
    constructor(configService: ConfigService, usuarioRepository: UsuarioPrismaRepository);
    validate(payload: UsuarioJWTPayload): Promise<Usuario>;
    private verificaExpiracao;
}
export {};
