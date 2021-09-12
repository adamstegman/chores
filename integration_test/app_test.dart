import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

import 'package:chores/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('Chores', () {
    testWidgets('can be completed', (WidgetTester tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Verify that chores are listed
      final chore = find.byKey(Key('chore_1'));
      final complete = find.descendant(of: chore, matching: find.byIcon(Icons.check_circle_outline));
      expect(complete, findsOneWidget);

      // Tap the complete icon and trigger a frame.
      await tester.tap(complete);
      await tester.pumpAndSettle();

      // Verify that our chore is completed.
      final completed = find.descendant(of: chore, matching: find.byIcon(Icons.done));
      expect(completed, findsOneWidget);
      expect(complete, findsNothing);

      // Tap the complete icon and trigger a frame.
      await tester.tap(completed);
      await tester.pumpAndSettle();

      // Verify that our chore is not completed anymore.
      expect(complete, findsOneWidget);
      expect(completed, findsNothing);
    });
  });
}
