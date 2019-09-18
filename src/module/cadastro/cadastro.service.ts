import { NotFoundException } from '@nestjs/common';
import { IsString } from 'class-validator';
import * as mongoose from 'mongoose';

export class CadastroService {

    private mongo;

    constructor(mockMongoose?: any) {
        this.mongo = mockMongoose || mongoose;
    }

    public async buscar(filter: any): Promise<any> | never {
        const data = [];
        try {
            data.push({});
            return data;
        } catch (err) {
            throw err;
        }
    }

}