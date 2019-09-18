import { Module, MiddlewareConsumer } from '@nestjs/common';
import { CadUserCORSMiddleware } from './cors.middleware';
import { HealthCheckerService } from './server/health-checker/health-checker.service';
import { HealthCheckerController } from './server/health-checker/health-checker.controller';
import { CadastroModule } from './module/cadastro.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [CadastroModule, JwtModule.register({
        secretOrPrivateKey: 'YWNob3UgcXVlIGV1IGVzdGF2YSBicmluY2FuZG8gPwo='
    })],
    controllers: [HealthCheckerController],
    providers: [HealthCheckerService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(CadUserCORSMiddleware).forRoutes('/**');
    }
}