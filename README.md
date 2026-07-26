# API de Tarefas

API REST de gerenciamento de tarefas desenvolvida com Node.js, TypeScript e
Express. As tarefas são armazenadas em memória e são apagadas quando o servidor
é reiniciado.

## Estrutura do projeto

```text
src/
├── controllers/
│   └── TaskController.ts
├── routes/
│   └── task.routes.ts
├── services/
│   └── TaskService.ts
└── server.ts
```

- **Routes:** relaciona cada método e endereço HTTP ao método correspondente do
  Controller.
- **Controller:** recebe os dados da requisição, chama o Service e define a
  resposta HTTP.
- **Service:** guarda o array de tarefas e contém as regras do CRUD.
- **Server:** configura o Express e disponibiliza as rotas a partir de
  `/tasks`.

## Como executar

Instale as dependências:

```bash
npm install
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

## Exemplo de criação

```json
{
  "title": "Estudar Node.js"
}
```

Toda tarefa criada recebe automaticamente um `id` e começa com
`"completed": false`.

## Testes no Postman

O arquivo `api-tarefas.postman.json` pode ser importado no Postman para testar
as cinco requisições. Mantenha o servidor ligado com `npm run dev` enquanto
executa os testes.

Ordem sugerida:

1. Criar tarefa.
2. Listar tarefas.
3. Buscar tarefa pelo ID.
4. Atualizar tarefa.
5. Apagar tarefa.

Nas requisições que usam `/tasks/:id`, substitua `:id` pelo número retornado na
criação, por exemplo: `/tasks/1`.
