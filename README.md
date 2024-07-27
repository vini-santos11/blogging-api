# Blogging API

API do Grupo 3 da PÓS Graduação Full Stack Development - FIAP

## Requisitos

- Node.js
- Docker

# Inicialização

1. Crie o arquivo ".env" na raiz do projeto e defina suas variáveis conforme o arquivo ".env.example":

```shell
    JWT_SECRET=
    PORT=
```

2. Instale as dependências:

```shell
    npm install
```

3. Inicialize o banco de dados:

```shell
    docker compose up -d
```

4. Rode as migrations:

```shell
    npm run migration:run
```

5. Inicialize o projeto:

```shell
    npm start
```
