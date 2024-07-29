# Blogging API

API do Grupo 3 da PÓS Graduação Full Stack Development - FIAP

## Tecnologias

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **[TypeScript](https://www.typescriptlang.org/)** xxxx.
- **[Docker](https://docs.docker.com)** e **[Docker Compose](https://docs.docker.com/compose/)** para criar nossos ambientes de desenvolvimento e teste.
- **[Express](https://github.com/expressjs/express)** como uma ferramenta para construir o servidor _web_ que lida com nossos _endpoints_ de listagem e gerenciamento de _posts_.
- **[Postgres](https://www.postgresql.org)** para armazenar nossos dados e **[TypeORM](https://typeorm.io/)** como um ORM Node.js.
- **[Zod](https://zod.dev/)** para validações de esuqemas.

## Requisitos

- [Node.js](https://nodejs.org/) v18+ para rodar o projeto
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
