// Define o formato que toda tarefa deve ter.
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface UpdateTaskData {
  title?: string;
  completed?: boolean;
}

// O Service concentra as regras e o armazenamento das tarefas.
// Os métodos são async para que o Controller possa usar await e para manter
// a estrutura preparada para um futuro banco de dados.
class TaskService {
  private tasks: Task[] = [];
  private nextId = 1; // Guardo o próximo ID separadamente para não repetir IDs após uma exclusão.

  async create(title: string): Promise<Task> {
    // Impede títulos formados apenas por espaços.
    if (!title) {
      throw new Error('O título da tarefa é obrigatório.');
    }

    // Toda tarefa nova começa como não concluída.
    const newTask: Task = {
      id: this.nextId,
      title: title.trim(),
      completed: false,
    };

    // Primeiro salvo a tarefa e depois preparo o ID da próxima.
    this.tasks.push(newTask);
    this.nextId++;

    return newTask;
  }

  async list(completed?: boolean): Promise<Task[]> {
    // Devolvo o array completo (sem filtro).
    if (completed === undefined) {
      return this.tasks;
    }

    // Devolvo somente as tarefas com o mesmo valor de completed (com filtro).
    return this.tasks.filter((task) => task.completed === completed);
  }

  async findById(id: number): Promise<Task | undefined> {
    // find devolve a primeira tarefa correspondente ou undefined.
    return this.tasks.find((task) => task.id === id);
  }

  async update(
    id: number,
    data: UpdateTaskData,
  ): Promise<Task | undefined> {
    // Guardo a tarefa encontrada, e não apenas sua posição no array.
    const task = this.tasks.find((storedTask) => storedTask.id === id);

    if (!task) {
      return undefined;
    }

    // Só altero title quando ele realmente foi enviado na requisição.
    if (data.title !== undefined) {
      if (!data.title) {
        throw new Error('O título da tarefa não pode ser vazio.');
      }

      task.title = data.title.trim();
    }

    // O mesmo vale para completed, que precisa ser um booleano.
    if (data.completed !== undefined) {
      if (typeof data.completed !== 'boolean') {
        throw new Error(
          'O campo completed deve ser um valor booleano.',
        );
      }

      task.completed = data.completed;
    }

    // Como task referencia o objeto que está no array, as alterações já ficaram salvas.
    return task;
  }

  async delete(id: number): Promise<boolean> {
    // findIndex retorna a posição da tarefa ou -1 quando não encontra.
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return false;
    }

    // splice remove um elemento do array a partir da posição encontrada.
    this.tasks.splice(taskIndex, 1);
    return true;
  }
}

export { TaskService };