import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

// Uso uma única instância do Service para atender todas as requisições.
const taskService = new TaskService();

// O Controller recebe a requisição, chama o Service e monta a resposta HTTP.
class TaskController {
  async create(req: Request, res: Response) {
    try {
      // req.body contém o JSON enviado pelo cliente no corpo da requisição.
      const { title } = req.body;
      const task = await taskService.create(title);

      // 201 indica que um novo recurso foi criado com sucesso.
      return res.status(201).json(task);
    } catch (error) {
      // Erros de validação lançados pelo Service viram respostas 400.
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      // Este retorno cobre um erro inesperado que não seja uma instância de Error.
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async list(req: Request, res: Response) {
    // req.query lê o valor depois de "?" em rotas como /tasks?completed=true.
    const { completed } = req.query;

    // Como o valor da query chega como texto, aceito apenas "true" ou "false".
    if (
      completed !== undefined &&
      completed !== 'true' &&
      completed !== 'false'
    ) {
      return res.status(400).json({
        message: 'O filtro completed deve ser true ou false.',
      });
    }

    // Aqui transformo a string recebida em boolean. Se não houver filtro,
    // envio undefined para o Service retornar todas as tarefas.
    const completedFilter =
      completed === undefined ? undefined : completed === 'true';

    const tasks = await taskService.list(completedFilter);
    return res.status(200).json(tasks);
  }

  async findById(req: Request, res: Response) {
    // Parâmetros de rota chegam como string, então converto o ID para number.
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'O ID deve ser um número.' });
    }

    const task = await taskService.findById(id);

    // O Service retorna null quando não encontra uma tarefa com esse ID.
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }

    return res.status(200).json(task);
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'O ID deve ser um número.' });
      }

      // Os dois campos são opcionais, portanto o cliente pode alterar apenas um.
      const { title, completed } = req.body;
      const task = await taskService.update(id, { title, completed });

      if (!task) {
        return res.status(404).json({ message: 'Tarefa não encontrada.' });
      }

      return res.status(200).json(task);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'O ID deve ser um número.' });
    }

    const taskWasDeleted = await taskService.delete(id);

    // O boolean retornado pelo Service informa se alguma tarefa foi removida.
    if (!taskWasDeleted) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }

    // 204 representa sucesso sem conteúdo no corpo da resposta.
    return res.status(204).send();
  }
}

export { TaskController };
