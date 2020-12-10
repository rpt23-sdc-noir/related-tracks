#!/bin/bash
echo `date`
declare -a seeds
seeds+=(./calls/generateTracks.js)
seeds+=(./calls/generateTracks2.js)
seeds+=(./calls/generateUsers.js)
seeds+=(./calls/generateGenres.js)
seeds+=(./calls/generateProducers.js)
seeds+=(./calls/generatePlaylists.js)
seeds+=(./calls/generatePlaylists2.js)
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
seeds+=(./calls/plays/genP11.js)
seeds+=(./calls/plays/genP12.js)
seeds+=(./calls/plays/genP13.js)
seeds+=(./calls/plays/genP14.js)
seeds+=(./calls/plays/genP15.js)
seeds+=(./calls/plays/genP16.js)
seeds+=(./calls/plays/genP17.js)
seeds+=(./calls/plays/genP18.js)
seeds+=(./calls/plays/genP19.js)
seeds+=(./calls/playlistTracks/genPCol.js)
seeds+=(./calls/playlistTracks/genP01.js)
seeds+=(./calls/playlistTracks/genP02.js)
seeds+=(./calls/playlistTracks/genP03.js)
seeds+=(./calls/playlistTracks/genP04.js)
seeds+=(./calls/playlistTracks/genP05.js)
seeds+=(./calls/playlistTracks/genP06.js)
seeds+=(./calls/playlistTracks/genP07.js)
seeds+=(./calls/playlistTracks/genP08.js)
seeds+=(./calls/playlistTracks/genP09.js)
seeds+=(./calls/playlistTracks/genP10.js)
seeds+=(./calls/playlistTracks/genP11.js)
seeds+=(./calls/playlistTracks/genP12.js)
seeds+=(./calls/playlistTracks/genP13.js)
seeds+=(./calls/playlistTracks/genP14.js)
seeds+=(./calls/playlistTracks/genP15.js)
seeds+=(./calls/playlistTracks/genP16.js)
seeds+=(./calls/playlistTracks/genP17.js)
seeds+=(./calls/playlistTracks/genP18.js)
seeds+=(./calls/playlistTracks/genP19.js)
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
seeds+=(./calls/likes/genP11.js)
seeds+=(./calls/likes/genP12.js)
seeds+=(./calls/likes/genP13.js)
seeds+=(./calls/likes/genP14.js)
seeds+=(./calls/likes/genP15.js)
seeds+=(./calls/likes/genP16.js)
seeds+=(./calls/likes/genP17.js)
seeds+=(./calls/likes/genP18.js)
seeds+=(./calls/likes/genP19.js)
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
seeds+=(./calls/reposts/genP11.js)
seeds+=(./calls/reposts/genP12.js)
seeds+=(./calls/reposts/genP13.js)
seeds+=(./calls/reposts/genP14.js)
seeds+=(./calls/reposts/genP15.js)
seeds+=(./calls/reposts/genP16.js)
seeds+=(./calls/reposts/genP17.js)
seeds+=(./calls/reposts/genP18.js)
seeds+=(./calls/reposts/genP19.js)
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
seeds+=(./calls/comments/genP11.js)
seeds+=(./calls/comments/genP12.js)
seeds+=(./calls/comments/genP13.js)
seeds+=(./calls/comments/genP14.js)
seeds+=(./calls/comments/genP15.js)
seeds+=(./calls/comments/genP16.js)
seeds+=(./calls/comments/genP17.js)
seeds+=(./calls/comments/genP18.js)
seeds+=(./calls/comments/genP19.js)
for i in "${seeds[@]}"
do
  echo "starting to $i"
  node --max-old-space-size=850 $i & pid=$!
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
  ls -1 *.csv | while read fn
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