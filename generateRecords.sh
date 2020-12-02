#!/bin/bash
echo `date`
declare -a seeds
seeds+=(./calls/generateTracks.js)
seeds+=(./calls/generateUsers.js)
seeds+=(./calls/generateGenres.js)
seeds+=(./calls/generateProducers.js)
seeds+=(./calls/generatePlaylists.js)
seeds+=(./calls/playlistTracks/genPTCol.js)
seeds+=(./calls/playlistTracks/genPT1.js)
seeds+=(./calls/playlistTracks/genPT2.js)
seeds+=(./calls/playlistTracks/genPT3.js)
seeds+=(./calls/playlistTracks/genPT4.js)
seeds+=(./calls/playlistTracks/genPT5.js)
seeds+=(./calls/playlistTracks/genPT6.js)
seeds+=(./calls/playlistTracks/genPT7.js)
seeds+=(./calls/playlistTracks/genPT8.js)
seeds+=(./calls/playlistTracks/genPT9.js)
seeds+=(./calls/plays/genPCol.js)
seeds+=(./calls/plays/genP01.js)
seeds+=(./calls/plays/genP02.js)
seeds+=(./calls/plays/genP03.js)
seeds+=(./calls/plays/genP04.js)
seeds+=(./calls/plays/genP05.js)
seeds+=(./calls/plays/genP06.js)
seeds+=(./calls/plays/genP07.js)
seeds+=(./calls/plays/genP08.js)
seeds+=(./calls/plays/genP09.js)
seeds+=(./calls/plays/genP10.js)
seeds+=(./calls/likes/genPCol.js)
seeds+=(./calls/likes/genP01.js)
seeds+=(./calls/likes/genP02.js)
seeds+=(./calls/likes/genP03.js)
seeds+=(./calls/likes/genP04.js)
seeds+=(./calls/likes/genP05.js)
seeds+=(./calls/likes/genP06.js)
seeds+=(./calls/likes/genP07.js)
seeds+=(./calls/likes/genP08.js)
seeds+=(./calls/likes/genP09.js)
seeds+=(./calls/likes/genP10.js)
seeds+=(./calls/comments/genPCol.js)
seeds+=(./calls/comments/genP01.js)
seeds+=(./calls/comments/genP02.js)
seeds+=(./calls/comments/genP03.js)
seeds+=(./calls/comments/genP04.js)
seeds+=(./calls/comments/genP05.js)
seeds+=(./calls/comments/genP06.js)
seeds+=(./calls/comments/genP07.js)
seeds+=(./calls/comments/genP08.js)
seeds+=(./calls/comments/genP09.js)
seeds+=(./calls/comments/genP10.js)
seeds+=(./calls/reposts/genPCol.js)
seeds+=(./calls/reposts/genP01.js)
seeds+=(./calls/reposts/genP02.js)
seeds+=(./calls/reposts/genP03.js)
seeds+=(./calls/reposts/genP04.js)
seeds+=(./calls/reposts/genP05.js)
seeds+=(./calls/reposts/genP06.js)
seeds+=(./calls/reposts/genP07.js)
seeds+=(./calls/reposts/genP08.js)
seeds+=(./calls/reposts/genP09.js)
seeds+=(./calls/reposts/genP10.js)
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
declare -a records
records+=(data/tracks)
records+=(data/users)
records+=(data/playlists)
records+=(data/genres)
records+=(data/producers)
records+=(data/comments)
records+=(data/likes)
records+=(data/playlistTracks)
records+=(data/plays)
records+=(data/reposts)
for i in "${records[@]}"
do
  echo "it's time to concatenate folder: $i"
  cd $i
  ls -1 * | while read fn
  do
    cat "$fn" >> "../aggregated/all$i.csv" & pid=$!
    wait $pid
    rm "$fn"
  done
  echo "records concatenated in '../aggregated/all$i.csv'"
  cd ../..
done
unset records
echo `date`