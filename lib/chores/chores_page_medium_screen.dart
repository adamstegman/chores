import 'package:flutter/material.dart';

import '../core/callbacks.dart';
import '../core/constants.dart';
import 'chore.dart';
import 'chores_page.dart';

class ChoresPageMediumScreen extends StatelessWidget {
  final _title = Text(CHORES_TITLE);
  final Iterable<Chore> chores;
  final ToggleAtIndex toggleChoreCompleted;

  ChoresPageMediumScreen({Key? key, required this.chores, required this.toggleChoreCompleted}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: _title),
      body: Center(
        child: ChoresPage(chores: chores, toggleChoreCompleted: toggleChoreCompleted),
      ),
    );
  }
}
