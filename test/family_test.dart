// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility that Flutter provides. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:chores/chores/chore_provider.dart';
import 'package:chores/core/app.dart';

void main() {
  testWidgets('Family can be opened', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    final choreProvider = ChoreProvider();
    await tester.pumpWidget(ChoresApp(choreProvider));

    // Verify that the navigation bar is visible.
    final nav = find.byType(BottomNavigationBar).first;
    final family = find.descendant(of: nav, matching: find.byIcon(Icons.people));
    expect(family, findsOneWidget);

    // Tap the Family icon and trigger a frame.
    await tester.tap(family);
    await tester.pump();

    // TODO: Verify that the family widget is visible.
    expect(family, findsOneWidget);
  });
}
