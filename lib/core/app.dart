import 'package:chores/chores/chore_provider.dart';
import 'package:flutter/material.dart';

import 'constants.dart';
import 'home_page.dart';

class ChoresApp extends StatelessWidget {
  final ChoreProvider choreProvider;

  ChoresApp(this.choreProvider);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: APP_NAME,
      theme: ThemeData(
        brightness: Brightness.light,
        primarySwatch: Colors.teal,
      ),
      darkTheme: ThemeData(
        brightness: Brightness.dark,
        primarySwatch: Colors.teal,
      ),
      home: HomePage(choreProvider: choreProvider),
    );
  }
}
