import { Controller, Post, Get, Res, HttpStatus, Body, NotFoundException, HttpCode } from '@nestjs/common';
import { Response } from 'express';
import { HttpResponse } from '../../utils/http.response';
import { Status } from '../../utils/status.entity';
import { CadastroService } from './cadastro.service';

@Controller('cadastro')
export class CadastroController {

    constructor(private readonly service: CadastroService) { }

    @Post('registrar')
    public async registrar(@Res() res: Response, @Body() filter: any): Promise<Response> {
        let data;
        try {
            data = {};
        } catch (err) {
        }
        return res.status(HttpStatus.OK).json(
                new HttpResponse(new Status(0), data));
    }

    @Post('logar')
    public async logar(@Res() res: Response, @Body() filter: any): Promise<Response> {
        let data;
        try {
            data = {};
        } catch (err) {
        }
        return res.status(HttpStatus.OK).json(
                new HttpResponse(new Status(0), data));
    }

    @Post('buscar')
    public async buscar(@Res() res: Response, @Body() filter: any): Promise<Response> {
        let data;
        try {
            data = {};
        } catch (err) {
        }
        return res.status(HttpStatus.OK).json(
                new HttpResponse(new Status(0), data));
    }

}