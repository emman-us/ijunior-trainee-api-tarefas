import { Task } from '@prisma/client';
import { prisma } from '../config/prismaClient';

interface UpdateTaskData {
  title?: string;
  completed?: boolean;
}

// O Service concentra as regras e o acesso às tarefas armazenadas no banco.
class TaskService {
  async create(title: string): Promise<Task> {
    // title.trim() remove os espaços do início e do fim e ! verifica se o resultado ficou vazio.
    if (!title || !title.trim()) {
      throw new Error('O título da tarefa é obrigatório.');
    }

    // O banco gera o ID e o schema define completed como false por padrão.
    const newTask = await prisma.task.create({
      data: {
        title: title.trim(),
      },
    });

    return newTask;
  }

  async list(completed?: boolean): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      where: completed === undefined ? undefined : { completed },
      orderBy: { id: 'asc' },
    });

    return tasks;
  }

  async findById(id: number): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    return task;
  }

  async update(id: number, data: UpdateTaskData): Promise<Task | null> {
    const storedTask = await prisma.task.findUnique({
      where: { id },
    });

    if (!storedTask) {
      return null;
    }

    if (data.title !== undefined && !data.title.trim()) {
      throw new Error('O título da tarefa não pode ser vazio.');
    }

    if (
      data.completed !== undefined &&
      typeof data.completed !== 'boolean'
    ) {
      throw new Error('O campo completed deve ser um valor booleano.');
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title: data.title?.trim(),
        completed: data.completed,
      },
    });

    return updatedTask;
  }

  async delete(id: number): Promise<boolean> {
    const result = await prisma.task.deleteMany({
      where: { id },
    });

    return result.count > 0;
  }
}

export { TaskService };
