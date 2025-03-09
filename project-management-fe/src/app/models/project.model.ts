export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  toDo: boolean;
}
