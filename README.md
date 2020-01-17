# Extrator de imagens
Projeto de implementação de extração de imagens, usando as seguintes bibliotecas:
- NestJS;
- puppeteer;
- Mongoose;
## Instalação
```npm i```
## Uso
Utilizar via chamada websocket

=> Mensagem:
msgToServer

=> Payload:
{
    "url":"https://www.google.com"
}

### Iniciar a aplicação no modo desenvolvimento (nodemon)
```npm run dev```

### Iniciar a aplicação sem nodemon
```npm run start```

### Testes unitários
```npm run test```

### Coverage report
```/coverage/lcov-report/index.html```

### Observações

Testado com o site do google e o terra; Em ambos a extração é bem sucedida;
Existe a ressalva da biblioteca não conseguir redimensionar arquivos .gif;
As imagens originais são gravadas na pasta /utils/images;
O banco de dados armazena o thumbnail, com a largura fixa de 100px;