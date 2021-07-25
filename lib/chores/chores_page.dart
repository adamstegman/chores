import 'package:flutter/material.dart';

import '../core/callbacks.dart';
import 'chore.dart';
import 'chore_list.dart';

class ChoresPage extends StatelessWidget {
  final Iterable<Chore> chores;
  final ToggleAtIndex toggleChoreCompleted;

  const ChoresPage({Key? key, required this.chores, required this.toggleChoreCompleted}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ChoreList(chores: chores, toggleChoreCompleted: toggleChoreCompleted);
  }
}
