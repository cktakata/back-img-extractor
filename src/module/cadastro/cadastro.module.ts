import { Module, MiddlewareConsumer } from '@nestjs/common';
import { CadastroController } from './cadastro.controller';
import { CadastroService } from './cadastro.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule.register({
        secret: 'YWNob3UgcXVlIGV1IGVzdGF2YSBicmluY2FuZG8gPwo='
    })],
    controllers: [CadastroController],
    providers: [CadastroService],
    exports: [CadastroService],
})
export class CadastroModule { }