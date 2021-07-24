import 'package:flutter/material.dart';

import 'chore.dart';

typedef ToggleAtIndex = void Function(int index);

class ChoreList extends StatelessWidget {
  final ToggleAtIndex toggleChoreCompleted;
  final Iterable<Chore> chores;
  final _biggerFont = const TextStyle(fontSize: 18.0);

  ChoreList({Key? key, required this.chores, required this.toggleChoreCompleted}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.all(16.0),
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
      title: Text(chore.name, style: _biggerFont),
      leading: Icon(
        chore.completed ? Icons.done : Icons.check_circle_outline,
        color: chore.completed ? Theme.of(context).accentColor : null,
      ),
      onTap: () => toggleChoreCompleted(index),
    );
  }

  Chore _getChore(int index) {
    return chores.elementAt(index);
  }
}
