import { server } from '../src/server';
import * as mongoose from 'mongoose';
import { NestFactory } from '@nestjs/core';

jest.spyOn(mongoose, 'connect').mockImplementation(() => Promise.resolve(null) as any);

const mockNest = {
    setGlobalPrefix: () => {null},
    init: () => Promise.resolve(null),
    use: () => {null},
    listen: () => {
        return Promise.resolve({});
    }
}

jest.spyOn(NestFactory, 'create').mockImplementation(() => Promise.resolve(mockNest) as any);

process.env.LOCAL = 'true';

describe('server test', () => {
    it('should initialize', () => {
        const db = new server();
        expect(db).toBeTruthy;
    });
});
