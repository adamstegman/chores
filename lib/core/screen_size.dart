import 'package:flutter/material.dart';

enum ScreenSize {
  ExtraSmall,
  Small,
  Medium,
  Large,
  ExtraLarge,
}

ScreenSize getSize(BuildContext context) {
  double deviceWidth = MediaQuery.of(context).size.shortestSide;
  if (deviceWidth > 1200) return ScreenSize.ExtraLarge;
  if (deviceWidth > 992) return ScreenSize.Large;
  if (deviceWidth > 768) return ScreenSize.Medium;
  if (deviceWidth > 576) return ScreenSize.Small;
  return ScreenSize.ExtraSmall;
}
