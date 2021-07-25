import 'package:flutter/material.dart';

import '../core/constants.dart';
import 'family_page.dart';

class FamilyPageMediumScreen extends StatelessWidget {
  final _title = Text(FAMILY_TITLE);

  FamilyPageMediumScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: _title),
      body: Center(
        child: FamilyPage(),
      ),
    );
  }
}
