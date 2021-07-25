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
  testWidgets('Chores can be completed', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    final choreProvider = ChoreProvider();
    await tester.pumpWidget(ChoresApp(choreProvider));

    // Verify that chores are listed
    final chore = find.byType(ListTile).first;
    final complete = find.descendant(of: chore, matching: find.byIcon(Icons.check_circle_outline));
    expect(complete, findsOneWidget);

    // Tap the complete icon and trigger a frame.
    await tester.tap(complete);
    await tester.pump();

    // Verify that our chore is completed.
    final completed = find.descendant(of: chore, matching: find.byIcon(Icons.done));
    expect(completed, findsOneWidget);
    expect(complete, findsNothing);

    // Tap the complete icon and trigger a frame.
    await tester.tap(completed);
    await tester.pump();

    // Verify that our chore is not completed anymore.
    expect(complete, findsOneWidget);
    expect(completed, findsNothing);
  });
}
