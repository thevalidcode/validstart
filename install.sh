#!/bin/bash

set -e

echo "📦 Installing ValidStart..."

OS=$(uname | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)

# Determine correct binary
if [[ "$OS" == "darwin" ]]; then
  FILE="validstart-macos"
elif [[ "$OS" == "linux" ]]; then
  FILE="validstart-linux"
elif [[ "$OS" =~ "mingw" || "$OS" =~ "msys" || "$OS" =~ "cygwin" ]]; then
  FILE="validstart-win.exe"
else
  echo "❌ Unsupported OS: $OS"
  exit 1
fi

URL="https://github.com/thevalidcode/validstart/releases/latest/download/$FILE"

echo "🔽 Downloading binary from: $URL"
curl -fsSL "$URL" -o validstart
chmod +x validstart

# Prompt for global install
read -p "📦 Do you want to install ValidStart globally? (y/N): " confirm
if [[ "$confirm" == "y" || "$confirm" == "Y" ]]; then
  echo "📁 Moving binary to /usr/local/bin/validstart"
  sudo mv validstart /usr/local/bin/validstart
  echo "✅ Installed globally. You can now run: validstart"
else
  echo "ℹ️ You can run it locally using: ./validstart"
fi

# Optional: run immediately
read -p "🚀 Run ValidStart now? (y/N): " runnow
if [[ "$runnow" == "y" || "$runnow" == "Y" ]]; then
  if [[ "$confirm" == "y" || "$confirm" == "Y" ]]; then
    validstart
  else
    ./validstart
  fi
fi
