import { Controller, Post, Get, Res, HttpStatus, Body, Param, NotFoundException, HttpCode, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { HttpResponse } from '../../utils/http.response';
import { Status } from '../../utils/status.entity';
import { BodyArgs } from './repositories/image.entity';
import { ImageService } from './image.service';

@Controller('data')
export class ImageController {

    constructor(private readonly service: ImageService) { }

    @Post('scrap')
    public async scrap(@Res() res: Response, @Body() body: BodyArgs): Promise<Response> {
        let data;
        try {
            console.log(body)
            data = await this.service.getAllImages(body.url);
            console.log('Controller: ', data)
            if (data.status === 'ok') {
                return res.status(HttpStatus.OK).json(
                    new HttpResponse(new Status(HttpStatus.OK), data));
            } else {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                    new HttpResponse(new Status(HttpStatus.INTERNAL_SERVER_ERROR), data));
            }

        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                new HttpResponse(new Status(HttpStatus.INTERNAL_SERVER_ERROR), data));
        }
    }

}