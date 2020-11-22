#!/bin/bash
declare -a seeds
seeds+=(./seeds/generateTracks.js)
# seeds+=(./seeds/generateUsers.js)
# seeds+=(./seeds/generateGenres.js)
# seeds+=(./seeds/generateProducers.js)
# seeds+=(./seeds/generatePlaylists.js)
# seeds+=(./calls/playlistTracks/genPTCol.js)
# seeds+=(./calls/playlistTracks/genPT1.js)
# seeds+=(./calls/playlistTracks/genPT2.js)
# seeds+=(./calls/playlistTracks/genPT3.js)
# seeds+=(./calls/playlistTracks/genPT4.js)
# seeds+=(./calls/playlistTracks/genPT5.js)
# seeds+=(./calls/playlistTracks/genPT6.js)
# seeds+=(./calls/playlistTracks/genPT7.js)
# seeds+=(./calls/playlistTracks/genPT8.js)
# seeds+=(./calls/playlistTracks/genPT9.js)
for i in "${seeds[@]}"
do
  echo "starting to $i"
  node --max-old-space-size=2048 $i & pid=$!
  wait $pid
  echo "you told me to $i & i have"
done
echo "slaps hood of computer"
echo "this baby can fit so many records on it"
unset seeds
# declare -a records
# records+=(data/playlistTracks)
# for j in "${records[@]}"
# do
#   echo "it's time to concatenate folder: $j"
#   cd $j
#   ls -1t * | while read fn
#   do
#     cat "$fn" >> "../aggregated/allPTs.csv" & pid=$1
#     wait $pid
#     rm "$fn"
#   done
#   cd ../..
# done
# echo "data concatenated"
# unset records