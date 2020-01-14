import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule.register({
        secret: 'YWNob3UgcXVlIGV1IGVzdGF2YSBicmluY2FuZG8gPwo='
    })],
    controllers: [ImageController],
    providers: [ImageService],
    exports: [ImageService],
})
export class ImageModule { }