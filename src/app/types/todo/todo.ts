export interface Todo {
  userId: number;
  id?: number;
  title: string;
  completed: boolean;
  wasCompleted?: boolean;
  completionTime?: Date;
}
