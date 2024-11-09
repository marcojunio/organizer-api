# Organize API

Bem-vindo ao repositório da API do projeto **Organize**.

Este projeto utiliza Node.js, Prisma e Docker para facilitar o desenvolvimento e a configuração do ambiente. Siga os passos abaixo para rodar o backend

---

## Pré-requisitos

- Node.js e npm instalados
- Docker e Docker Compose instalados

## Configuração do Projeto Backend

### 1. Instale as dependências

No diretório raiz do projeto backend, instale as dependências usando o comando:

### `npm install`

Para configurar o banco de dados, use o Docker Compose para iniciar o container:

### `docker-compose up -d`

Após iniciar o container do banco de dados, execute as migrations para garantir que o banco esteja configurado corretamente:

### `prisma migrate deploy`

Agora, você pode iniciar o servidor de desenvolvimento com o comando:

### `npm run dev`