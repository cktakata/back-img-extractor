import { IsString, IsInt, IsDate, IsNumber } from 'class-validator';

export interface TelArgs {
    numero: string;
    ddd: string;
}

export interface UserArgs {
    nome: string;
    email: string;
    senha: string;
    telefones: TelArgs[];
    data_criacao: Date;
    data_atualizacao: Date;
    ultimo_login: Date;
    token: string;
}

export interface UserLogin {
    email: string;
    senha: string;
}

export interface UserSearch {
    userid: string;
    token: string;
}