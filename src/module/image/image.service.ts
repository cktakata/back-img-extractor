import { NotFoundException, HttpStatus, Injectable } from '@nestjs/common';
import { IsString } from 'class-validator';
import { imageModel } from '../model/imageSchema';
import { JwtService } from '@nestjs/jwt';
import * as crypto from "crypto";
import * as moment from "moment";
import { fork } from 'child_process';
import { Scraper } from 'image-scraper';

@Injectable()
export class ImageService {

    private jwtService: JwtService;

    constructor(jwtService: JwtService) {
        this.jwtService = jwtService;
    }

    public async getAllImages(URL: string) {
        try {
            const puppeteer = require('puppeteer');
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.setViewport({ width: 1920, height: 926 });
            await page.goto(URL);
            console.log("Scrapping images from: ", URL);
            const images = await page.evaluate(() => Array.from(document.images, e => e.src));
            await browser.close();
            console.log("Found " + images.length + " images");
            images.forEach(img => {
                this.saveImage(img, async (rtn: { status: string }) => {
                    console.log(rtn)
                });
            })
            return { status: 'ok' };
        } catch (e) {
            return { status: e.errmsg };
        }
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