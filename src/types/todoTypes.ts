export interface Todo {
  id: string;
  status: string;
  title: string;
  description: string;
  date: string;
}
export interface TodosState {
  todos: Todo[];
  trash: Todo[];
}
