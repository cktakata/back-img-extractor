import { Module, MiddlewareConsumer } from '@nestjs/common';
import { CadUserCORSMiddleware } from './cors.middleware';
import { HealthCheckerService } from './server/health-checker/health-checker.service';
import { HealthCheckerController } from './server/health-checker/health-checker.controller';
import { ImageModule } from './module/image/image.module';
import { LogModule } from './module/log/log.module';

@Module({
    imports: [ImageModule, LogModule],
    controllers: [HealthCheckerController],
    providers: [HealthCheckerService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(CadUserCORSMiddleware).forRoutes('/**');
    }
}