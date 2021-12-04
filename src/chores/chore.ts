export type Chore = {
  completed: boolean;
  id: string;
  name: string;
  error?: any;
}

export const emptyChore = {
  id: '',
  name: '',
  completed: false,
};
