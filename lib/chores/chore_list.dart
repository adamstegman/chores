import 'package:flutter/material.dart';

import '../core/callbacks.dart';
import 'chore.dart';

class ChoreList extends StatelessWidget {
  final Iterable<Chore> chores;
  final ToggleAtIndex toggleChoreCompleted;
  final _biggerFont = const TextStyle(fontSize: 18.0);

  ChoreList({Key? key, required this.chores, required this.toggleChoreCompleted}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.all(16.0),
      itemCount: chores.length * 2,
      itemBuilder: (context, i) {
        if (i.isOdd) return const Divider();

        final index = i ~/ 2;
        return _buildRow(index, context: context);
      },
    );
  }

  Widget _buildRow(int index, {required BuildContext context}) {
    final chore = _getChore(index);
    return ListTile(
      key: Key('chore_$index'),
      title: Text(chore.name, style: _biggerFont),
      leading: Semantics(
        label: 'Completed state',
        hint: chore.completed ? 'Press to uncomplete' : 'Press to complete',
        value: chore.completed ? 'Complete' : 'Not complete',
        child: Icon(
          chore.completed ? Icons.done : Icons.check_circle_outline,
          color: chore.completed ? Theme.of(context).accentColor : null,
        ),
      ),
      onTap: () => toggleChoreCompleted(index),
    );
  }

  Chore _getChore(int index) {
    return chores.elementAt(index);
  }
}
