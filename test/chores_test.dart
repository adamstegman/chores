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
    expect(chore, findsOneWidget);
    final completed = find.bySemanticsLabel(RegExp('Completed state')).first;
    expect(completed, findsOneWidget);
    expect(tester.getSemantics(completed).value, 'Not complete');

    // Tap the complete icon and trigger a frame.
    await tester.tap(completed);
    await tester.pump();

    // Verify that our chore is completed.
    expect(completed, findsOneWidget);
    expect(tester.getSemantics(completed).value, 'Complete');

    // Tap the complete icon and trigger a frame.
    await tester.tap(completed);
    await tester.pump();

    // Verify that our chore is not completed anymore.
    expect(completed, findsOneWidget);
    expect(tester.getSemantics(completed).value, 'Not complete');
  });
}
