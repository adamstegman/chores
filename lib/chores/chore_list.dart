import 'package:chores/chores/chore_list_row.dart';
import 'package:flutter/material.dart';

import '../core/callbacks.dart';
import 'chore.dart';

class ChoreList extends StatelessWidget {
  final Iterable<Chore> chores;
  final ToggleAtIndex toggleChoreCompleted;

  ChoreList({Key? key, required this.chores, required this.toggleChoreCompleted}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.all(16.0),
      itemCount: chores.length * 2,
      itemBuilder: (context, i) {
        if (i.isOdd) return const Divider();

        final index = i ~/ 2;
        final chore = _getChore(index);
        return ChoreListRow(
          chore: chore,
          index: index,
          toggleChoreCompleted: toggleChoreCompleted,
        );
      },
    );
  }

  Chore _getChore(int index) {
    return chores.elementAt(index);
  }
}
