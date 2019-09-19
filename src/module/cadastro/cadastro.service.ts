import { NotFoundException, HttpStatus } from '@nestjs/common';
import { IsString } from 'class-validator';
import * as mongoose from 'mongoose';
import { UserArgs, UserLogin, UserSearch } from './repositories/cadastro.entity';
import { usuarioModel } from '../model/usuarioSchema';
import * as crypto from "crypto";

export class CadastroService {

    private mongo;

    constructor(mockMongoose?: any) {
        this.mongo = mockMongoose || mongoose;
    }

    public async registrar(filter: UserArgs): Promise<any> | never {
        try {
            const user: any = await new usuarioModel({
                nome: filter.nome,
                email: filter.email,
                senha: crypto.createHmac('sha512', filter.senha),
                telefones: [{
                    numero: filter.telefones[0].numero,
                    ddd: filter.telefones[0].ddd,
                }]
            }).save();
            return user;
        } catch (err) {
            throw err;
        }
    }

    public async logar(filter: UserLogin): Promise<any> | never {
        try {
            await usuarioModel.findOne({
                email: filter.email
              }, (user: any) => {
                if (crypto.createHmac('sha512', user.senha) === crypto.createHmac('sha512', filter.senha)) {
                    return user;
                } else {
                    throw({error: HttpStatus.FORBIDDEN});
                }
              })
        } catch (err) {
            throw err;
        }
    }

    public async buscar(filter: UserSearch): Promise<any> | never {
        const data = [];
        try {
            await usuarioModel.findById({
                id: filter.id
              }, (user: any) => {
                return user;
              })
        } catch (err) {
            throw err;
        }
    }

}