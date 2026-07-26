import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

// Router cria um conjunto separado de rotas relacionadas às tarefas.
const taskRoutes = Router();
const taskController = new TaskController();

// Como o server.ts monta este Router em /tasks, "/" representa /tasks.
// A rota apenas conecta cada método HTTP ao método correto do Controller.
taskRoutes.post('/', taskController.create);
taskRoutes.get('/', taskController.list);
taskRoutes.get('/:id', taskController.findById);
taskRoutes.put('/:id', taskController.update);
taskRoutes.delete('/:id', taskController.delete);

export { taskRoutes };
