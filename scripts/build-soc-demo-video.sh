#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="$ROOT/public/assets/soc/figma/final"
OUT_DIR="$ROOT/public/assets/soc/demo"
WORK="$ROOT/.tmp-soc-demo"
OUT="$OUT_DIR/prototype-walkthrough.mp4"

W=1280
H=800
FPS=30
DUR=6
XFADE=0.8
SCROLL=75

mkdir -p "$OUT_DIR" "$WORK"
rm -f "$WORK"/seg-*.mp4

SCREENS=(
  home
  post-search
  report-found
  no-report-found
  all-reports
  monthly-release
)

i=1
for name in "${SCREENS[@]}"; do
  seg=$(printf "%s/seg-%02d.mp4" "$WORK" "$i")
  ffmpeg -y -loop 1 -i "$ASSETS/${name}.png" \
    -filter_complex "
      [0:v]scale=${W}:-2:flags=lanczos,setsar=1,
      pad=${W}:ih:(ow-iw)/2:0:color=white,
      pad=${W}:max(ih\\,${H}):0:(max(ih\\,${H})-ih)/2:color=white,
      crop=${W}:${H}:0:min(t*${SCROLL}\\,max(ih-${H}\\,0)),
      fps=${FPS},
      format=yuv420p
    " \
    -t "$DUR" \
    -c:v libx264 -preset medium -crf 22 -pix_fmt yuv420p \
    "$seg"
  i=$((i + 1))
done

STEP=$(awk "BEGIN { print $DUR - $XFADE }")

ffmpeg -y \
  -i "$WORK/seg-01.mp4" \
  -i "$WORK/seg-02.mp4" \
  -i "$WORK/seg-03.mp4" \
  -i "$WORK/seg-04.mp4" \
  -i "$WORK/seg-05.mp4" \
  -i "$WORK/seg-06.mp4" \
  -filter_complex "
    [0:v][1:v]xfade=transition=fade:duration=${XFADE}:offset=${STEP}[v01];
    [v01][2:v]xfade=transition=fade:duration=${XFADE}:offset=$(awk "BEGIN { print 2*$STEP }")[v02];
    [v02][3:v]xfade=transition=fade:duration=${XFADE}:offset=$(awk "BEGIN { print 3*$STEP }")[v03];
    [v03][4:v]xfade=transition=fade:duration=${XFADE}:offset=$(awk "BEGIN { print 4*$STEP }")[v04];
    [v04][5:v]xfade=transition=fade:duration=${XFADE}:offset=$(awk "BEGIN { print 5*$STEP }")[vout]
  " \
  -map "[vout]" \
  -c:v libx264 -preset medium -crf 22 -pix_fmt yuv420p -movflags +faststart \
  "$OUT"

ls -lh "$OUT"
ffprobe -v quiet -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$OUT"
