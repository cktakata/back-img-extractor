import { Module, MiddlewareConsumer } from '@nestjs/common';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { CadastroService } from './cadastro/cadastro.service';
import { CadastroController } from './cadastro/cadastro.controller';

@Module({
    imports: [],
    controllers: [CadastroController],
    providers: [CadastroService],
})
export class CadastroModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(CorsMiddleware).forRoutes('/**');
    }
}