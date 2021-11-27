import { Chore } from './chore';

// TODO: real backend
export class ChoreProvider {
  private chores: Chore[] = [
    { name: 'Chore 1', id: 'Chore 1', completed: false },
    { name: 'Chore 2', id: 'Chore 2', completed: false },
    { name: 'Chore 3', id: 'Chore 3', completed: false },
    { name: 'Chore 4', id: 'Chore 4', completed: false },
    { name: 'Chore 5', id: 'Chore 5', completed: false },
    { name: 'Chore 6', id: 'Chore 6', completed: false },
  ];

  // TODO: Observable<Chore> so consumers can .take(20) or whatever
  getChores(): Chore[] {
    return this.chores.map(chore => ({ ...chore }));
  }

  toggleChoreCompleted(chore: Chore): Promise<void> {
    return new Promise(resolve => {
      const _chore = this.chores.find(c => c.id === chore.id);
      _chore.completed = !_chore.completed;
      resolve();
    });
  }
}
