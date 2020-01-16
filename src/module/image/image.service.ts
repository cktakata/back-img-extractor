import { Injectable } from '@nestjs/common';
import { imageModel } from '../model/imageSchema';
import * as crypto from "crypto";
import { fork } from 'child_process';

@Injectable()
export class ImageService {

    constructor() {
    }

    public async getAllImages(URL: string): Promise<any> {
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
            const data = [];
            for (const img of images) {
                await this.saveImage(img, async (rtn: { status: string, filename: string, thumb: string }) => {
                    // Here we will broadcast thumbnail using sockets 
                    console.log(rtn.filename);
                    data.push(rtn.filename);
                });
            }
            return { status: 'ok' };
        } catch (e) {
            return { status: e.errmsg };
        }
    }

    public async saveImage(imageURL: string, callback: Function): Promise<any> {
        const child = fork(
            __dirname + '../../../utils/fork.task.ts'
            , [imageURL]
            , {
                execArgv: ['-r', 'ts-node/register']
            }
        )
        child.on('message', async function (m) {
            // Receive results from child process
            // console.log('Filename: ' + m.filename);
            // console.log('Thumbnail: ' + m.thumbnail);
            const hash = crypto.createHmac('sha512', imageURL).digest('hex');
            // console.log(hash)
            try {
                await new imageModel({
                    hash: hash, // Stores full image URL as HASH
                    filename: m.filename,
                    url: imageURL,
                    thumb: m.thumbdata
                }).save();
                callback({ status: 'ok', filename: m.filename, thumb: m.thumb });
            } catch (e) {
                // Dupe image, get data from database
                const image = await imageModel.findOne({ 'hash': hash });
                callback({ status: 'ok', filename: image.filename, thumb: image.thumb });
            }
        });
    }
}