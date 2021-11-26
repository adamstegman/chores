import { Chore } from './chore';

export class ChoreProvider {
  private chores: Chore[] = [
    new Chore('Chore 1'),
    new Chore('Chore 2'),
    new Chore('Chore 3'),
    new Chore('Chore 4'),
    new Chore('Chore 5'),
    new Chore('Chore 6'),
  ];

  // TODO: Observable<Chore> so consumers can .take(20) or whatever
  getChores(): Chore[] {
    return this.chores.slice(0);
  }

  toggleChoreCompleted(index: number) {
    this.chores[index].completed = !this.chores[index].completed;
  }
}
