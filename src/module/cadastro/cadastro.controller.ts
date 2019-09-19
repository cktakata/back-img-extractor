import { Controller, Post, Get, Res, HttpStatus, Body, Param, NotFoundException, HttpCode, Req } from '@nestjs/common';
import { Response, Request } from 'express';
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
            data = await this.service.registrar(filter);
            return res.status(HttpStatus.OK).json(
                new HttpResponse(new Status(HttpStatus.OK), data));
        } catch (err) {
            switch(err.code) {
                case 11000:
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                        new HttpResponse(new Status(HttpStatus.INTERNAL_SERVER_ERROR, 'E-mail já existente.')));
                default:
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                        new HttpResponse(new Status(HttpStatus.INTERNAL_SERVER_ERROR, err.errmsg)));
            }
        }
    }

    @Post('signin')
    public async logar(@Res() res: Response, @Body() filter: UserLogin): Promise<Response> {
        let data;
        try {
            data = await this.service.logar(filter);
            return res.status(HttpStatus.OK).json(
                new HttpResponse(new Status(HttpStatus.OK), data));
        } catch (err) {
            switch(err.code) {
                case 401:
                    return res.status(HttpStatus.UNAUTHORIZED).json(
                        new HttpResponse(new Status(HttpStatus.UNAUTHORIZED, err.errmsg)));
                default:
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                        new HttpResponse(new Status(HttpStatus.INTERNAL_SERVER_ERROR, err.errmsg)));
            }
        }
    }

    @Get('search/:userid')
    public async buscar(@Req() req: Request, @Res() res: Response, @Param() params): Promise<Response> {
        let data;
        try {
            const authorization = req.get('Authorization');
            if(!authorization) {
                return res.status(HttpStatus.UNAUTHORIZED).json(
                    new HttpResponse(new Status(HttpStatus.UNAUTHORIZED, 'Não autorizado')));
            }
            data = await this.service.buscar({...params, token: authorization});
            return res.status(HttpStatus.OK).json(
                new HttpResponse(new Status(0), data));
        } catch (err) {
            switch(err.code) {
                case 401:
                    return res.status(HttpStatus.UNAUTHORIZED).json(
                        new HttpResponse(new Status(HttpStatus.UNAUTHORIZED, err.errmsg)));
                default:
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                        new HttpResponse(new Status(HttpStatus.INTERNAL_SERVER_ERROR, err.errmsg)));
            }
        }
    }

}