import 'package:flutter/material.dart';

import '../chores/chore_provider.dart';
import 'home_medium_screen.dart';
import 'home_small_screen.dart';
import 'screen_size.dart';

class HomePage extends StatefulWidget {
  final ChoreProvider choreProvider;

  const HomePage({Key? key, required this.choreProvider}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    final chores = widget.choreProvider.getChores();
    final size = getSize(context);
    if ([ScreenSize.ExtraLarge, ScreenSize.Large, ScreenSize.Medium].contains(size)) {
      return HomeMediumScreen(chores: chores, toggleChoreCompleted: _toggleChoreCompleted);
    }

    return HomeSmallScreen(chores: chores, toggleChoreCompleted: _toggleChoreCompleted);
  }

  void _toggleChoreCompleted(int index) {
    setState(() {
      widget.choreProvider.toggleChoreCompleted(index);
    });
  }
}
