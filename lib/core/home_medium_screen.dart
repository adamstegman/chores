import 'package:flutter/material.dart';

import '../chores/chore.dart';
import '../chores/chores_page_medium_screen.dart';
import '../family/family_page_medium_screen.dart';
import 'callbacks.dart';

class HomeMediumScreen extends StatelessWidget {
  final Iterable<Chore> chores;
  final ToggleAtIndex toggleChoreCompleted;

  HomeMediumScreen({Key? key, required this.chores, required this.toggleChoreCompleted}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(width: 300, child: FamilyPageMediumScreen()),
        Expanded(child: ChoresPageMediumScreen(chores: chores, toggleChoreCompleted: toggleChoreCompleted)),
      ],
    );
  }
}
