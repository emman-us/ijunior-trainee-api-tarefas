# API de Tarefas

API REST de gerenciamento de tarefas desenvolvida com Node.js, TypeScript,
Express, MySQL e Prisma. As tarefas ficam armazenadas no banco de dados e
permanecem disponíveis após o servidor ser reiniciado.

## Estrutura do projeto

```text
src/
├── config/
│   └── prismaClient.ts
├── controllers/
│   └── TaskController.ts
├── routes/
│   └── task.routes.ts
├── services/
│   └── TaskService.ts
└── server.ts
prisma/
├── migrations/
└── schema.prisma
```

- **Routes:** relaciona cada método e endereço HTTP ao método correspondente do
  Controller.
- **Controller:** recebe os dados da requisição, chama o Service e define a
  resposta HTTP.
- **Service:** contém as regras do CRUD e acessa o banco por meio do Prisma.
- **Prisma Client:** mantém uma única instância do cliente de banco de dados.
- **Schema e migrations:** definem a tabela `Task` e versionam sua criação.
- **Server:** configura o Express e disponibiliza as rotas a partir de
  `/tasks`.

## Como executar

Instale as dependências:

```bash
npm install
```

Crie um banco MySQL chamado `api_tarefas`. Depois, copie `.env.example` para
`.env` e ajuste usuário, senha, endereço, porta e nome do banco na variável
`DATABASE_URL`.

Aplique a migration e gere o Prisma Client:

```bash
npm run prisma:migrate
npm run prisma:generate
```

Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`.

Para verificar se o TypeScript compila sem erros:

```bash
npm run build
```

Depois do build, a versão compilada também pode ser executada com:

```bash
npm start
```

## Endpoints

| Método | Rota | Ação |
| --- | --- | --- |
| POST | `/tasks` | Cria uma tarefa |
| GET | `/tasks` | Lista todas as tarefas |
| GET | `/tasks/:id` | Busca uma tarefa pelo ID |
| PUT | `/tasks/:id` | Atualiza uma tarefa |
| DELETE | `/tasks/:id` | Apaga uma tarefa |

Também é possível filtrar a listagem pelo estado da tarefa:

```text
GET /tasks?completed=true
GET /tasks?completed=false
```

