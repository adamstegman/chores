#!/bin/sh

# Runs integration tests on all platforms.
# Start the simulator/emulators *before* running this script.
# Add an argument to run tests on a specific platform or device.

set -ux

DEVICES="web ios android"
if [[ $DEVICES =~ $1 ]]; then
  DEVICE="$1"
  NAME=""
else
  DEVICE=""
  NAME="$1"
fi

main() {
  local success=0
  if [ -z "$DEVICE" -o "$DEVICE" = "web" ]; then
    test_web "$NAME"
    (( success = success || $? ))
  fi
  if [ -z "$DEVICE" -o "$DEVICE" = "ios" ]; then
    test_ios "$NAME"
    (( success = success || $? ))
  fi
  if [ -z "$DEVICE" -o "$DEVICE" = "android" ]; then
    test_android "$NAME"
    (( success = success || $? ))
  fi
  return $success
}

test_android() {
  local name="$1"
  local android_pid="$(pgrep -f qemu-system-x86_64)"
  if [ -z "$android_pid" ]; then
    # TODO: launch emulator with correct device
    # pushd "$HOME/Library/Android/sdk"
    # ./emulator/emulator -avd Pixel_3a_API_30_x86 &
    # android_pid="$!"
    # sleep 5
    # popd
    echo "No Android device running, skipping..." >&2
    return 0
  fi

  local device_id="$(android_device_id "$name")"
  if [ "$device_id" = "null" ]; then
    echo "No Android device named '$name' running, skipping..." >&2
    return 0
  fi

  local success=0
  flutter drive \
    --driver=test_driver/integration_test.dart \
    --target=integration_test/app_test.dart \
    -d "$device_id"
  success=$?

  # TODO: launch emulator
  # kill "$android_pid"
  return $success
}

android_device_id() {
  local name="$1"

  local devices="$(flutter devices --machine | jq -r 'map(select(.targetPlatform | startswith("android")))')"
  local device_id=""
  if [ -n "$name" ]; then
    device_id="$(echo "$devices" | jq -r "map(select(.name | ascii_downcase | contains(\"$name\")))[0] | .id")"
  else
    device_id="$(echo "$devices" | jq -r '.[0] | .id')"
  fi
  echo "$device_id"
}

test_ios() {
  local name="$1"

  # TODO: launch simulator with correct device
  # open -a Simulator
  local device_id="$(ios_device_id "$name")"
  if [ "$device_id" = "null" ]; then
    echo "No iOS device named '$name' running, skipping..." >&2
    return 0
  fi

  local success=0
  flutter drive \
    --driver=test_driver/integration_test.dart \
    --target=integration_test/app_test.dart \
    -d "$device_id"
  success=$?

  # TODO: launch simulator
  # local ios_pid="$(pgrep -f Simulator.app)"
  # kill "$ios_pid"
  return $success
}

ios_device_id() {
  local name="$1"

  local devices="$(flutter devices --machine | jq -r 'map(select(.targetPlatform == "ios"))')"
  local device_id=""
  if [ -n "$name" ]; then
    device_id="$(echo "$devices" | jq -r "map(select(.name | ascii_downcase | contains(\"$name\")))[0] | .id")"
  else
    device_id="$(echo "$devices" | jq -r '.[0] | .id')"
  fi
  echo "$device_id"
}

test_web() {
  local name="${1:-chrome}"
  local drivers="safari chrome"
  if [[ -n "$name" && ! $drivers =~ $name ]]; then
    echo "No web device named '$name' found, skipping..." >&2
    return 0
  fi

  local driver_pid=""
  if [ "$name" = "safari" ]; then
    safaridriver -p 4444 &
    driver_pid="$!"
  elif [ "$name" = "chrome" ]; then
    chromedriver --port=4444 &
    driver_pid="$!"
  fi

  local success=0
  flutter drive \
    --driver=test_driver/integration_test.dart \
    --target=integration_test/app_test.dart \
    "--browser-name=$name" \
    -d web-server
  success=$?
  kill "$driver_pid"
  return $success
}

main
exit $?