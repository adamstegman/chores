import 'chore.dart';

class ChoreProvider {
  // TODO: actual storage
  final _chores = [
    Chore(name: 'Clean 1'),
    Chore(name: 'Clean 2'),
    Chore(name: 'Clean 3'),
    Chore(name: 'Clean 4'),
    Chore(name: 'Clean 5'),
    Chore(name: 'Clean 6'),
  ];

  Iterable<Chore> getChores() {
    return _chores;
  }

  void toggleChoreCompleted(int index) {
    _chores.elementAt(index).completed = !_chores.elementAt(index).completed;
  }
}
