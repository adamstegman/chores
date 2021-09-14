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
      expect(chore, findsOneWidget);
      final completed = find.bySemanticsLabel(RegExp('Completed state')).first;
      expect(completed, findsOneWidget);
      expect(tester.getSemantics(completed).value, 'Not complete');

      // Tap the complete icon and trigger a frame.
      await tester.tap(completed);
      await tester.pumpAndSettle();

      // Verify that our chore is completed.
      expect(completed, findsOneWidget);
      expect(tester.getSemantics(completed).value, 'Complete');

      // Tap the complete icon and trigger a frame.
      await tester.tap(completed);
      await tester.pumpAndSettle();

      // Verify that our chore is not completed anymore.
      expect(completed, findsOneWidget);
      expect(tester.getSemantics(completed).value, 'Not complete');
    });
  });
}
