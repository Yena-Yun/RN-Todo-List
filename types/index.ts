export interface Todo {
  id: string;
  content: string;
  isDone: boolean;
}

export type IsDone = Pick<Todo, 'isDone'>;

export type DeviceWidth = { width: number };
