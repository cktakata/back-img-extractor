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
                const rtn = await this.saveImage(img);
                console.log(rtn['filename']);
                data.push(rtn);
            }
            return { status: 'ok', data };
        } catch (e) {
            return { status: e.errmsg };
        }
    }

    public async saveImage(imageURL: string) {
        let obj = {};
        const execution = await new Promise(
            async function (resolve, reject) {
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
                        obj = { status: 'ok', filename: m.filename, thumb: m.thumb };
                        resolve(obj);
                    } catch (e) {
                        // Dupe image, get data from database
                        console.log(e.errmsg)
                        const image = await imageModel.findOne({ 'hash': hash });
                        if (image) {
                            obj = { status: 'ok', filename: image.filename, thumb: image.thumb };
                        } else {
                            obj = { status: 'nok', filename: '', thumb: '' };
                        }
                        resolve(obj);
                    }
                });

                child.on('exit', async function (m) {
                });
            }
        )
        console.log("File: ", execution['filename'])
        return execution;
    }

}