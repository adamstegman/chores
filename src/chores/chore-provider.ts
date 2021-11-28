import { Chore } from './chore';

// TODO: real backend
export class ChoreProvider {
  private chores: Chore[] = [
    { name: 'Chore 1', id: 'Chore 1', completed: false },
    { name: 'Chore 2', id: 'Chore 2', completed: false },
    { name: 'Chore 3', id: 'Chore 3', completed: false },
  ];

  addChore(chore: Chore): Promise<void> {
    return new Promise(resolve => {
      this.chores.push({ ...chore });
      resolve();
    });
  }

  // TODO: Observable<Chore> so consumers can .take(20) or whatever
  getChores(): Promise<Chore[]> {
    return new Promise(resolve => {
      resolve(this.chores.map(chore => ({ ...chore })));
    })
  }

  toggleChoreCompleted(chore: Chore): Promise<void> {
    return new Promise(resolve => {
      const _chore = this.chores.find(c => c.id === chore.id);
      _chore.completed = !_chore.completed;
      resolve();
    });
  }
}
