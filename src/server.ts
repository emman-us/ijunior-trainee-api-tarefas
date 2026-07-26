import express from 'express';
import { taskRoutes } from './routes/task.routes';

// express() cria a aplicação que receberá as requisições HTTP.
const app = express();
const PORT = 3333;

app.use(express.json());

// Rota para confirmar pelo navegador que a API está funcionando.
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'API funcionando!' });
});

// Todas as rotas declaradas em taskRoutes passam a começar com /tasks.
app.use('/tasks', taskRoutes);

// listen inicia o servidor e faz a aplicação aguardar requisições na porta 3333.
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
