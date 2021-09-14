import 'package:flutter/material.dart';

import '../core/callbacks.dart';
import 'chore.dart';

class ChoreListRow extends StatelessWidget {
  final Chore chore;
  final int index;
  final ToggleAtIndex toggleChoreCompleted;
  final _biggerFont = const TextStyle(fontSize: 18.0);

  const ChoreListRow({
    Key? key,
    required this.chore,
    required this.index,
    required this.toggleChoreCompleted,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
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
}
