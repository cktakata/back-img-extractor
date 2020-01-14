import { NotFoundException, HttpStatus, Injectable } from '@nestjs/common';
import { IsString } from 'class-validator';
import { imageModel } from '../model/imageSchema';
import { JwtService } from '@nestjs/jwt';
import * as crypto from "crypto";
import * as moment from "moment";
import { fork } from 'child_process';

@Injectable()
export class ImageService {

    private jwtService: JwtService;

    constructor(jwtService: JwtService) {
        this.jwtService = jwtService;
    }

    public async saveImage(imageURL: string, callback: Function) {
        const child = fork(
            __dirname + '../../../utils/fork.task.ts'
            , [imageURL]
            , {
                execArgv: ['-r', 'ts-node/register']
            }
        )
        child.on('message', async function (m) {
            // Receive results from child process
            console.log('Filename: ' + m.filename);
            console.log('Thumbnail: ' + m.thumbnail);
            try {
                const image = await new imageModel({
                    filename: m.filename,
                    url: imageURL,
                    thumb: m.thumbdata
                }).save();
                callback({ status: 'ok' });
            } catch (e) {
                console.log(e.errmsg)
                callback({ status: e.errmsg });
                console.log(e)
            }
        });
    }
}