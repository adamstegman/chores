import 'package:flutter/material.dart';

import '../chores/chores_page.dart';
import '../family/family_page.dart';
import 'constants.dart';

class NavItem {
  final String label;
  final Icon icon;
  final Widget widget;

  NavItem({required this.label, required this.icon, required this.widget});
}

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _title = Text(APP_NAME);
  final _navItems = [
    NavItem(
      icon: Icon(Icons.people),
      label: FAMILY_TITLE,
      widget: FamilyPage(),
    ),
    NavItem(
      icon: Icon(Icons.check),
      label: CHORES_TITLE,
      widget: ChoresPage(),
    ),
  ];
  int _selectedNavIndex = 1;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: _title,
      ),
      body: Center(
        child: IndexedStack(
          children: _navItems.map((item) => item.widget).toList(),
          index: _selectedNavIndex,
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: _navItems.map((item) => BottomNavigationBarItem(icon: item.icon, label: item.label)).toList(),
        currentIndex: _selectedNavIndex,
        selectedItemColor: Theme.of(context).accentColor,
        onTap: _setSelectedNavIndex,
      ),

      // TODO: NewChore component
      // floatingActionButton: FloatingActionButton(
      //   onPressed: _incrementCounter,
      //   tooltip: 'Increment',
      //   child: Icon(Icons.add),
      // ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }

  void _setSelectedNavIndex(int index) {
    setState(() => _selectedNavIndex = index);
  }
}
