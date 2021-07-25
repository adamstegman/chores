import 'package:flutter/material.dart';

import '../chores/chore.dart';
import '../chores/chores_page.dart';
import '../family/family_page.dart';
import 'callbacks.dart';
import 'constants.dart';
import 'nav_item.dart';

class HomeSmallScreen extends StatefulWidget {
  final Iterable<Chore> chores;
  final ToggleAtIndex toggleChoreCompleted;
  late final navItems = [
    NavItem(
      icon: Icon(Icons.people),
      label: FAMILY_TITLE,
      widget: FamilyPage(),
    ),
    NavItem(
      icon: Icon(Icons.check),
      label: CHORES_TITLE,
      widget: ChoresPage(chores: chores, toggleChoreCompleted: toggleChoreCompleted),
    ),
  ];

  HomeSmallScreen({Key? key, required this.chores, required this.toggleChoreCompleted}) : super(key: key);

  @override
  _HomeSmallScreenState createState() => _HomeSmallScreenState();
}

class _HomeSmallScreenState extends State<HomeSmallScreen> {
  int _selectedNavIndex = 1;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: widget.navItems[_selectedNavIndex].title,
      ),
      body: IndexedStack(
        children: widget.navItems.map((item) => item.widget).toList(),
        index: _selectedNavIndex,
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: widget.navItems.map((item) => BottomNavigationBarItem(icon: item.icon, label: item.label)).toList(),
        currentIndex: _selectedNavIndex,
        selectedItemColor: Theme.of(context).accentColor,
        onTap: _setSelectedNavIndex,
      ),
    );
  }

  void _setSelectedNavIndex(int index) {
    setState(() => _selectedNavIndex = index);
  }
}
