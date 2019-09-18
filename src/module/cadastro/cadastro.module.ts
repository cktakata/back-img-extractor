import { Module, MiddlewareConsumer } from '@nestjs/common';
import { CadastroController } from './cadastro.controller';
import { CadastroService } from './cadastro.service';

@Module({
    imports: [],
    controllers: [CadastroController],
    providers: [CadastroService],
    exports: [CadastroService],
})
export class DealingPanelModule { }