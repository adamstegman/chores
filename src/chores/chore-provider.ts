import { Chore } from './chore';

// TODO: real backend
export class ChoreProvider {
  private chores: Chore[] = [
    { name: 'Chore 1', id: '399cb5a6-b3aa-42ee-ba3c-a518b2738242', completed: false },
    { name: 'Chore 2', id: 'd145a9c7-b38a-4e77-86a6-10e93aa4fa31', completed: false },
    { name: 'Chore 3', id: '23d1d0c3-afd2-4ac3-8445-ce61f554590a', completed: false },
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

  updateChore(chore: Chore): Promise<void> {
    return new Promise(resolve => {
      const index = this.chores.findIndex(c => c.id === chore.id);
      this.chores.splice(index, 1, chore);
      resolve();
    });
  }
}
