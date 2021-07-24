import 'package:flutter/material.dart';

import 'chore.dart';
import 'chore_list.dart';

class ChoresPage extends StatefulWidget {
  @override
  _ChoresPageState createState() => _ChoresPageState();
}

class _ChoresPageState extends State<ChoresPage> {
  final _completedChoreIndexes = <int>[];

  @override
  Widget build(BuildContext context) {
    return ChoreList(chores: _generateChores(), toggleChoreCompleted: _toggleChoreCompleted);
  }

  // TODO: actual storage
  Iterable<Chore> _generateChores() sync* {
    var index = 0;

    // We're in a sync* function, so `while (true)` is okay.
    while (true) {
      yield Chore(name: 'clean $index', completed: _completedChoreIndexes.contains(index));
      index++;
    }
  }

  void _toggleChoreCompleted(int index) {
    setState(() {
      if (_completedChoreIndexes.contains(index)) {
        _completedChoreIndexes.remove(index);
      } else {
        _completedChoreIndexes.add(index);
      }
    });
  }
}
