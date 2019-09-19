# Cadastro de usuários
Projeto de implementação de cadastro de usuários, usando as seguintes bibliotecas:
- NestJS;
- JWT;
- Mongoose;
## Instalação
```npm i```
## Uso

### Iniciar a aplicação no modo desenvolvimento (nodemon)
```npm run dev```

### Iniciar a aplicação sem nodemon
```npm run start```

### Testes unitários
```npm run test```

### Coverage report
```/coverage/lcov-report/index.html```

### Endpoints

```http://localhost:8080/cad-user/health``` => HealthCheck

```http://localhost:8080/cad-user/cadastro/signup``` => Criar novo usuário

```http://localhost:8080/cad-user/cadastro/signin``` => Logar

```http://localhost:8080/cad-user/cadastro/search/:id``` => Busca de usuário

