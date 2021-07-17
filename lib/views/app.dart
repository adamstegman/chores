import 'package:flutter/material.dart';

import '../constants.dart';
import 'chores_home.dart';

class ChoresApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: APP_NAME,
      theme: ThemeData(
        // This is the theme of your application.
        primarySwatch: Colors.teal,
      ),
      home: ChoresHome(),
    );
  }
}
