# API Amparo Digital

API para gerenciar pessoas e itens, destinada a dar suporte a pessoas em situação de carência. Tecnologias: Node.js + TypeScript, Fastify, Prisma ORM, PostgreSQL, Docker e Bcrypt.

Para rodar a aplicação, primeiro suba um container Docker com PostgreSQL local:  
`docker run --name amparo-postgres -e POSTGRES_PASSWORD=senha123 -e POSTGRES_USER=postgres -e POSTGRES_DB=amparo-digital-db -p 5432:5432 -d postgres`

Crie um arquivo `.env` na raiz do projeto com:  
`DATABASE_URL="postgresql://postgres:senha123@localhost:5432/amparo-digital-db?schema=public"`

Instale as dependências, aplique migrations e gere o client Prisma:  
`pnpm install && pnpm prisma migrate reset --force && pnpm prisma generate`

Compile e rode o servidor:  
`pnpm run build && pnpm run start`

O servidor estará disponível em `http://localhost:3000`.

Endpoints disponíveis:

**Pessoas (`/persons`)**: GET `/` retorna todas as pessoas, POST `/` cria pessoa com JSON `{ "name": "Vinicius", "email": "vinicius@email.com", "password": "1234" }`, PATCH `/:id` atualiza pessoa (name, email, password), DELETE `/:id` remove pessoa.

**Itens (`/items`)**: GET `/` retorna todos os itens, POST `/` cria item com JSON `{ "name": "Arroz", "quantity": 10 }`, PATCH `/:id` atualiza item, DELETE `/:id` remove item.

Notas: todas as senhas são armazenadas hashadas com bcrypt, garanta que o PostgreSQL esteja rodando e acessível na porta configurada no `.env`. Para desenvolvimento, `prisma migrate reset --force` recria o banco do zero.
