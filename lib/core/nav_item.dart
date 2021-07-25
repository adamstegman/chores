import 'package:flutter/material.dart';

class NavItem {
  final String label;
  final Icon icon;
  final Text title;
  final Widget widget;

  NavItem({required this.label, required this.icon, required this.widget, Text? title})
      : this.title = title == null ? Text(label) : title;
}
