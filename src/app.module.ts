import { Module, OnModuleDestroy } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from 'env/environment.dto';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: validateEnv,
    }),
    InfrastructureModule,
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
