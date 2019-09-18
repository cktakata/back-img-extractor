import * as mongoose from 'mongoose';
import * as fs from 'fs';
import * as cors from 'cors';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export class server {

    private PORT: number;
    private DBURI: string;

    constructor() {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        process.env.LOCAL = 'true';
        this.PORT = Number(process.env.PORT) || 8080;
        this.DBURI = `mongodb://localhost:27017/caduser`
        this.config();
    }

    private async config() {
        const app = await NestFactory.create(AppModule);
        app.setGlobalPrefix('cad-user');
        await app.init();
        app.use(cors({
            origin: '*',
            exposedHeaders: ['x-uid', 'x-access-token', 'x-access-token-type', 'x-access-token-expiry', 'x-pvd-wt', 'x-component-version'],
            methods: ['post', 'get', 'options'],
        }));
        app.listen(this.PORT, async() => {
            await mongoose.connect(
                this.DBURI + '?authSource=admin&w=1',
                {
                    useNewUrlParser: true,
                    useCreateIndex: true
                },
            ).then(() => {
                console.log(
                    'MongoDb connected at:',
                    'mongodb://localhost:27017/caduser'
                );
            })
            .catch((err) => {
                console.error(err, this.DBURI);
            });
        });
        console.log('App is running at port', this.PORT)
    }

};
