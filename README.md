# Blogging API

API do Grupo 3 da PÓS Graduação Full Stack Development - FIAP

## 🚀 Tecnologias

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **[TypeScript](https://www.typescriptlang.org/)** para auxiliar na tipagem e detecção de erros em tempo de execução.
- **[Docker](https://docs.docker.com)** e **[Docker Compose](https://docs.docker.com/compose/)** para criar nossos ambientes de desenvolvimento e teste.
- **[Express](https://github.com/expressjs/express)** como uma ferramenta para construir o servidor _web_ que lida com nossos _endpoints_ de listagem e gerenciamento de _posts_.
- **[Postgres](https://www.postgresql.org)** para armazenar nossos dados e **[TypeORM](https://typeorm.io/)** como um ORM Node.js.
- **[Zod](https://zod.dev/)** para validações de esquemas.
- **[Jest](https://jestjs.io/)** para cobertura de testes.

## ⚠️ Requisitos

- [Node.js](https://nodejs.org/) v18+ para rodar o projeto
- Docker

## 💻 Como baixar e inicializar o projeto

1. Clonar o repositório

```shell
    # Clonar o repositório
    git clone https://github.com/vini-santos11/blogging-api.git

    # Entrar no diretório
    $ cd blogging-api
```

2. Crie o arquivo ".env" na raiz do projeto e defina suas variáveis conforme o arquivo ".env.example":

```shell
    JWT_SECRET={SUA_JWT_SECRET}
    PORT={PORTA}
```

```shell
💡 Para gerar uma chave secreta JWT aleatória para rodar o seguinte comando no terminal:

node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

3. Instale as dependências:

```shell
    npm install
```

4. Inicialize a api e o banco de dados:

```shell
    docker compose up --build -d
```

5. Execute o docker da api:

```shell
    docker exec -it blogging-api sh
```

6. Rode as migrations dentro do shell do docker:

```shell
    npm run migration:run
```

## 🧪 Testes
Para executar os testes unitários, basta executar o seguinte comando
```shell
    npm run test
```
Até o momento a cobertura de testes ficou em 54.01%

<img src="https://ik.imagekit.io/aliceribeiro/Cobertura%20teste%20-%20terminal_UapeU5a7W.png">

## 🗂️ Arquitetura do repositório
```
 BLOGGING-API/ 
 ├── src/ 
 │ ├── controllers/ 
 │ ├── middlewares/ 
 │ ├── routes/ 
 │ ├── services/ 
 │ ├── server.ts 
 │ └── ... 
 ├── docker-compose.yml
 ├── .env 
 ├── package.json 
 ├── tsconfig.json 
 └── ...

```
