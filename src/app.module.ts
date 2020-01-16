import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ImgCORSMiddleware } from './cors.middleware';
import { HealthCheckerService } from './server/health-checker/health-checker.service';
import { HealthCheckerController } from './server/health-checker/health-checker.controller';
import { ImageModule } from './module/image/image.module';
import { LogModule } from './module/log/log.module';
import { AppGateway } from './module/log/log.gateway';

@Module({
    imports: [ImageModule],
    controllers: [HealthCheckerController],
    providers: [HealthCheckerService, AppGateway],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(ImgCORSMiddleware).forRoutes('/**');
    }
}