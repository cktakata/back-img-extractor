import { CadastroService } from '../src/module/cadastro/cadastro.service';
import { JwtService } from '@nestjs/jwt';
import mockingoose from 'mockingoose';
import { usuarioModel } from '../src/module/model/usuarioSchema';
import { UserArgs, UserLogin, UserSearch } from '../src/module/cadastro/repositories/cadastro.entity';
import * as moment from 'moment';

const mockJwt = {
    sign: () => {}
};
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
const mockParams = {
    userid: '123',
    token: 'Bearer {test}'
} as UserSearch;
const mockUser = {
    "userid": "123",
    "nome": "Epaminondas",
    "email": "epaminondas@gmail.com",
    "senha": "ded1bda29058c02f011c01087e12543684821c54d42ac2a9924a1a0ee10830b5a2028a90febc0cda5188517bc79aecdbd720b00895181571496e8688c57ddfa0",
    "data_criacao": new Date(),
    "data_atualizacao": new Date(),
    "ultimo_login": new Date(),
    "token": "test"
}

const finderMock = query => {
    return [mockUser];
};
const saveMock = query => {
    return [mockUser];
};

describe('Cadastro Service', () => {
    let service: CadastroService;
    let jwtService: JwtService;

    beforeEach(() => {
        jwtService = mockJwt as any;
        service = new CadastroService(jwtService);
        mockingoose(usuarioModel).toReturn(saveMock, 'save');
        mockingoose(usuarioModel).toReturn(finderMock, 'find');
        mockingoose(usuarioModel).toReturn(finderMock, 'findOneAndUpdate');
    });

    describe('List operation cases', () => {
        it('should have instance service', () => {
            expect(service).toBeTruthy();
        });

        it('should test registrar', async () => {
            expect(await service.registrar(mockUserArgs)).toBeTruthy();
        });

        it('should test logar', async () => {
            expect(await service.logar(mockUserLogin)).toBeTruthy();
        });

        it('should test buscar', async () => {
            expect(await service.buscar(mockParams)).toBeTruthy();
        });

    })

})