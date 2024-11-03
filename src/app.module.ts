import { Module, OnModuleDestroy } from '@nestjs/common';
import { AuthModule } from './modules/auth/infra/auth.module';
import { UsuarioModule } from './modules/usuarios/infra/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from 'env/environment.dto';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: validateEnv,
    }),
    AuthModule,
    UsuarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleDestroy {
  onModuleDestroy() {
    console.log('App is shutting down...');
    // Aqui você pode limpar recursos ou fechar conexões ativamente
  }
}
