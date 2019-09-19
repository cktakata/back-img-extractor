import { NotFoundException, HttpStatus, Injectable } from '@nestjs/common';
import { IsString } from 'class-validator';
import { UserArgs, UserLogin, UserSearch } from './repositories/cadastro.entity';
import { usuarioModel } from '../model/usuarioSchema';
import { JwtService } from  '@nestjs/jwt';
import * as crypto from "crypto";
import * as moment from "moment";

@Injectable()
export class CadastroService {

    private jwtService: JwtService;

    constructor(jwtService: JwtService) {
        this.jwtService = jwtService;
    }

    private async getNewId() {
        try {
            const usuarios: any = await usuarioModel.find({}).sort({ _id: -1 }).limit(1);
            if (usuarios.length > 0) {
                const seq = usuarios? parseFloat(usuarios[0].userid) + 1 : 1;
                return `0000${seq}`.slice(-5);
            } else {
                return `00001`;
            }
        } catch (err) {
            console.log(err);
            return '';
        }
    }

    public async registrar(filter: UserArgs): Promise<any> | never {
        try {
            const now = new Date();
            const payload = `${filter.nome}${filter.email}${now}`
            const user: any = await new usuarioModel({
                userid: await this.getNewId(),
                nome: filter.nome,
                email: filter.email,
                senha: crypto.createHmac('sha512', filter.senha).digest('hex'),
                telefones: filter.telefones,
                token: this.jwtService.sign(payload),
            }).save();
            return Promise.resolve({
                'userId': user.userid,
                'data_criacao': user.data_criacao,
                'data_atualizacao': user.data_atualizacao,
                'ultimo_login': user.ultimo_login,
                'token': user.token,
            });
        } catch (err) {
            throw err
        }
    }

    public async logar(filter: UserLogin): Promise<any> | never {
        try {
            const user: any = await usuarioModel.find({'email': { $regex: filter.email }} ).sort({ _id: -1 }).limit(1);
            if (user[0].senha === crypto.createHmac('sha512', filter.senha).digest('hex')) {
                const now = new Date();
                const payload = `${user.nome}${user.email}${now}`
                const token = this.jwtService.sign(payload);
                const updateUser = await usuarioModel.findOneAndUpdate({ userId: user[0].userId }, { ultimo_login: now, token: token }, { new: true })
                return Promise.resolve({
                    'userId': updateUser.userid,
                    'data_criacao': updateUser.data_criacao,
                    'data_atualizacao': updateUser.data_atualizacao,
                    'ultimo_login': updateUser.ultimo_login,
                    'token': updateUser.token,
                });
            } else {
                const errObj = {
                    code: HttpStatus.UNAUTHORIZED,
                    errmsg: 'Usuário e/ou senha inválidos',
                }
                return Promise.reject(errObj);
            } 
        } catch (err) {
            throw err;
        }
    }

    public async buscar(filter: UserSearch): Promise<any> | never {
        try {
            const user: any = await usuarioModel.find({'userid': { $regex: filter.userid }} ).sort({ _id: -1 }).limit(1);
            if(user.length > 0) {
                if (`Bearer {${user[0].token}}` === filter.token) {
                    const ultimo_login = moment(user[0].ultimo_login).format('YYYYMMDDhhmmss');
                    const hora_atual = moment().subtract(30, 'minutes').format('YYYYMMDDhhmmss');
                    if (parseInt(hora_atual) > parseInt(ultimo_login)) {
                        const errObj = {
                            code: HttpStatus.UNAUTHORIZED,
                            errmsg: 'Sessão inválida',
                        }
                        return Promise.reject(errObj);
                    } else {
                        return Promise.resolve({
                            'userId': user[0].userid,
                            'data_criacao': user[0].data_criacao,
                            'data_atualizacao': user[0].data_atualizacao,
                            'ultimo_login': user[0].ultimo_login,
                            'token': user[0].token,
                        });
                    }
                } else {
                    const errObj = {
                        code: HttpStatus.UNAUTHORIZED,
                        errmsg: 'Não autorizado',
                    }
                    return Promise.reject(errObj);
                }
            } else {
                const errObj = {
                    code: HttpStatus.INTERNAL_SERVER_ERROR,
                    errmsg: 'Usuário inexistente',
                }
                return Promise.reject(errObj);
            }
        } catch (err) {
            throw err;
        }
    }

}