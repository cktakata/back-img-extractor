
export class WorkerTask {

    private imageUrl: string;
    private destFolder: string;

    constructor(imageUrl: string, destFolder?: string) {
        this.imageUrl = imageUrl;
        if (destFolder) {
            this.destFolder = destFolder;
        } else {
            this.destFolder = __dirname + '/images';
        }
    }

    public async baixar() {
        const options = {
            url: this.imageUrl,
            dest: this.destFolder
        }
        try {
            const download = require('image-downloader');
            const { filename, image } = await download.image(options)
            return await this.redimensionar(filename);
        } catch (e) {
            console.error(e)
            return null
        }
    }

    private async redimensionar(filename: string) {
        try {
            const fs = require('fs-extra');
            const resizeImg = require('resize-img');
            const thumb = filename.split('.')[0] + '_thumb.' + filename.split('.')[1];
            let img = await fs.readFile(filename);
            let buf = await resizeImg(img, {
                width: 100
            });
            // await fs.writeFile(thumb, buf);
            return {
                filename: filename.split('/')[filename.split('/').length - 1],
                thumbnail: thumb.split('/')[thumb.split('/').length - 1],
                thumbdata: Buffer.from(buf).toString('base64')
            };
        } catch (e) {
            console.log(filename);
            console.log(e);
            const thumb = filename.split('.')[0] + '_thumb.' + filename.split('.')[1];
            return {
                filename: filename.split('/')[filename.split('/').length - 1],
                thumbnail: thumb.split('/')[thumb.split('/').length - 1],
                thumbdata: ''
            }
        }
    }
}
