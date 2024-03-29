import { NestMiddleware } from '@nestjs/common';
import { RequestHandler } from 'express';
import * as cors from 'cors';

export declare class ImgCORSMiddleware implements NestMiddleware {
    static configure(opts: {
        origin: '*',
        // exposedHeaders: ['x-uid', 'x-access-token', 'x-access-token-type', 'x-access-token-expiry', 'x-pvd-wt', 'x-component-version'],
        // allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
        // methods: ['post, get'],
        // preflightContinue: false,
        // optionsSuccessStatus: 204
    }): void;
    private static options;
    resolve(...args: any[]): RequestHandler;
}