import { CadastroController } from '../src/module/cadastro/cadastro.controller';
import { CadastroService } from '../src/module/cadastro/cadastro.service';
import { Response } from 'express';
import { UserArgs, UserLogin } from '../src/module/cadastro/repositories/cadastro.entity';

export const request = {
    get: () => { return {'Authorization': 'test'} },
} as any;
export const response = {
    status: (status) => ({json: () => null}),
} as Response;
const mockUserArgs = {
    "nome": "Epaminondas",
    "email": "epaminondas@gmail.com",
    "senha": "password",
    "telefones": [
        {
            "numero": "123456789",
            "ddd": "11"
        },
        {
            "numero": "987654321",
            "ddd": "12"
        }
    ]
} as UserArgs;
const mockUserLogin = {
	"email": "epaminondas@gmail.com",
	"senha": "password"
} as UserLogin;
const mockParams = {};

const mockService = {
    registrar: () => Promise.resolve({}),
    logar: () => Promise.resolve({}),
    buscar: () => Promise.resolve({}),
}
describe('Cadastro Controller', () => {
    let controller: CadastroController;
    let service: CadastroService;

    beforeEach(() => {
        service = mockService as any;
        controller = new CadastroController(service);
    });

    describe('List operation cases', () => {
        it('should have instance controller', () => {
            expect(controller).toBeTruthy();
        });

        it('should test registrar', () => {
            expect(() => {
                controller.registrar(response, mockUserArgs);
            }).not.toThrow();
        });

        it('should test logar', () => {
            expect(() => {
                controller.logar(response, mockUserLogin);
            }).not.toThrow();
        });

        it('should test buscar', () => {
            expect(() => {
                controller.buscar(request, response, mockParams);
            }).not.toThrow();
        });
    });

});