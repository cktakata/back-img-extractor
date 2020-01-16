import { Module } from '@nestjs/common';
import { AppGateway } from './log.gateway';

@Module({
    providers: [AppGateway]
})
export class LogModule { }