import 'package:flutter/material.dart';

import '../chore.dart';

class ChoreListView extends StatefulWidget {
  @override
  _ChoreListViewState createState() => _ChoreListViewState();
}

class _ChoreListViewState extends State<ChoreListView> {
  final _chores = <Chore>[];
  final _biggerFont = const TextStyle(fontSize: 18.0);

  @override
  Widget build(BuildContext context) {
    return _buildChores();
  }

  Widget _buildChores() {
    return ListView.builder(
      padding: const EdgeInsets.all(16.0),
      itemBuilder: (context, i) {
        if (i.isOdd) return const Divider();

        final index = i ~/ 2;
        if (index >= _chores.length) {
          _chores.addAll(generateChores().take(10));
        }
        // TODO: skip if completed
        return _buildRow(_chores[index]);
      },
    );
  }

  Widget _buildRow(Chore chore) {
    return ListTile(
      title: Text(chore.name, style: _biggerFont),
      trailing: Icon(
        chore.completed ? Icons.done : Icons.check_circle_outline,
        color: chore.completed ? Colors.green : null,
      ),
      onTap: () => setState(() => chore.completed = !chore.completed),
    );
  }

  // TODO: actual storage
  Iterable<Chore> generateChores() sync* {
    var index = 0;

    // We're in a sync* function, so `while (true)` is okay.
    while (true) {
      index++;
      yield Chore(name: 'clean $index');
    }
  }
}
