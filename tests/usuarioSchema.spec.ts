import { usuarioModel } from '../src/module/model/usuarioSchema';
import mockingoose from 'mockingoose';

describe('usuario Schema test', () => {
    it('should initialize', async () => {
        const mockUsuario = {
            "userid": "00001",
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
        }
        const checker = new usuarioModel(mockUsuario);
        mockingoose(usuarioModel).toReturn({}, 'save');
        await checker.save();
    });
})