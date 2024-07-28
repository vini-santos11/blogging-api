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

3. Inicialize a api e o banco de dados:

```shell
    docker compose up --build -d
```

4. Execute o docker da api:

```shell
    docker exec -it blogging-api sh
```

5. Rode as migrations dentro do shell do docker:

```shell
    npm run migration:run
```
