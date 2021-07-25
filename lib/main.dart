import 'package:chores/chores/chore_provider.dart';
import 'package:flutter/material.dart';

import 'core/app.dart';

final choreProvider = ChoreProvider();
void main() => runApp(ChoresApp(choreProvider));
