import { Controller, Post, Get, Res, HttpStatus, Body, Param, NotFoundException, HttpCode } from '@nestjs/common';
import { Response } from 'express';
import { HttpResponse } from '../../utils/http.response';
import { Status } from '../../utils/status.entity';
import { CadastroService } from './cadastro.service';
import { UserArgs, UserLogin } from './repositories/cadastro.entity';

@Controller('cadastro')
export class CadastroController {

    constructor(private readonly service: CadastroService) { }

    @Post('signup')
    public async registrar(@Res() res: Response, @Body() filter: UserArgs): Promise<Response> {
        let data;
        try {
            data = this.service.registrar(filter);
            return res.status(HttpStatus.OK).json(
                new HttpResponse(new Status(0), data));
        } catch (err) {
            return res.status(err).json(
                new HttpResponse(new Status(0), data));
        }
    }

    @Post('signin')
    public async logar(@Res() res: Response, @Body() filter: UserLogin): Promise<Response> {
        let data;
        try {
            data = this.service.logar(filter);
            return res.status(HttpStatus.OK).json(
                new HttpResponse(new Status(0), data));
        } catch (err) {
            return res.status(err).json(
                new HttpResponse(new Status(0), data));
        }
    }

    @Get('search/:userid')
    public async buscar(@Res() res: Response, @Param() params): Promise<Response> {
        let data;
        try {
            data = this.service.buscar(params);
            return res.status(HttpStatus.OK).json(
                new HttpResponse(new Status(0), data));
        } catch (err) {
            return res.status(err).json(
                new HttpResponse(new Status(0), data));
        }
    }

}