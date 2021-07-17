// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility that Flutter provides. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:chores/main.dart';

void main() {
  testWidgets('Chores can be completed', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(ChoresApp());

    // Verify that chores are listed
    final chore = find.byType(ListTile).first;
    final complete = find.descendant(of: chore, matching: find.byIcon(Icons.check_circle_outline));

    // Tap the complete icon and trigger a frame.
    await tester.tap(complete);
    await tester.pump();

    // Verify that our checkmark has toggled.
    final completed = find.descendant(of: chore, matching: find.byIcon(Icons.done));
    expect(completed, findsOneWidget);
  });
}
