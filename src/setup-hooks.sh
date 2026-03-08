#!/usr/bin/env bash
set -e

ROOT="src/fonts"

echo "Creating clean fonts directory..."
mkdir -p $ROOT

echo "Copying required fonts..."

cp src/fonts/Inter/Inter-VariableFont_opsz,wght.ttf $ROOT/inter-variable.ttf
cp src/fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf $ROOT/jetbrains-mono-variable.ttf
cp src/fonts/IBM_Plex_Serif/IBMPlexSerif-Regular.ttf $ROOT/ibm-plex-serif-regular.ttf
cp src/fonts/UnifrakturCook/UnifrakturCook-Bold.ttf $ROOT/unifrakturcook-bold.ttf
cp src/fonts/VT323/VT323-Regular.ttf $ROOT/vt323-regular.ttf

echo "Fonts copied."

if command -v woff2_compress &> /dev/null
then
echo "Converting fonts to woff2..."
for f in $ROOT/*.ttf
do
woff2_compress "$f"
rm "$f"
done
echo "Conversion complete."
else
echo "woff2_compress not installed. Skipping conversion."
echo "Install with: sudo apt install woff2"
fi

echo "Done. Final fonts directory:"
ls -lh $ROOT
