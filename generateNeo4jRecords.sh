#!/bin/bash
echo `date`
declare -a seeds
seeds+=(./calls_neo4j/generateTracks.js)
seeds+=(./calls_neo4j/generateUsers.js)
seeds+=(./calls_neo4j/generateGenres.js)
seeds+=(./calls_neo4j/generateProducers.js)
seeds+=(./calls_neo4j/generatePlaylists.js)
seeds+=(./calls_neo4j/genTrackGenres.js)
seeds+=(./calls_neo4j/genTrackProducers.js)
seeds+=(./calls_neo4j/playlistTracks/genPT0.js)
seeds+=(./calls_neo4j/playlistTracks/genPT1.js)
seeds+=(./calls_neo4j/playlistTracks/genPT2.js)
seeds+=(./calls_neo4j/playlistTracks/genPT3.js)
seeds+=(./calls_neo4j/playlistTracks/genPT4.js)
seeds+=(./calls_neo4j/playlistTracks/genPT5.js)
seeds+=(./calls_neo4j/playlistTracks/genPT6.js)
seeds+=(./calls_neo4j/playlistTracks/genPT7.js)
seeds+=(./calls_neo4j/playlistTracks/genPT8.js)
seeds+=(./calls_neo4j/playlistTracks/genPT9.js)
seeds+=(./calls_neo4j/plays/genP00.js)
seeds+=(./calls_neo4j/plays/genP01.js)
seeds+=(./calls_neo4j/plays/genP02.js)
seeds+=(./calls_neo4j/plays/genP03.js)
seeds+=(./calls_neo4j/plays/genP04.js)
seeds+=(./calls_neo4j/plays/genP05.js)
seeds+=(./calls_neo4j/plays/genP06.js)
seeds+=(./calls_neo4j/plays/genP07.js)
seeds+=(./calls_neo4j/plays/genP08.js)
seeds+=(./calls_neo4j/plays/genP09.js)
seeds+=(./calls_neo4j/likes/genP00.js)
seeds+=(./calls_neo4j/likes/genP01.js)
seeds+=(./calls_neo4j/likes/genP02.js)
seeds+=(./calls_neo4j/likes/genP03.js)
seeds+=(./calls_neo4j/likes/genP04.js)
seeds+=(./calls_neo4j/likes/genP05.js)
seeds+=(./calls_neo4j/likes/genP06.js)
seeds+=(./calls_neo4j/likes/genP07.js)
seeds+=(./calls_neo4j/likes/genP08.js)
seeds+=(./calls_neo4j/likes/genP09.js)
seeds+=(./calls_neo4j/comments/genP00.js)
seeds+=(./calls_neo4j/comments/genP01.js)
seeds+=(./calls_neo4j/comments/genP02.js)
seeds+=(./calls_neo4j/comments/genP03.js)
seeds+=(./calls_neo4j/comments/genP04.js)
seeds+=(./calls_neo4j/comments/genP05.js)
seeds+=(./calls_neo4j/comments/genP06.js)
seeds+=(./calls_neo4j/comments/genP07.js)
seeds+=(./calls_neo4j/comments/genP08.js)
seeds+=(./calls_neo4j/comments/genP09.js)
seeds+=(./calls_neo4j/reposts/genP00.js)
seeds+=(./calls_neo4j/reposts/genP01.js)
seeds+=(./calls_neo4j/reposts/genP02.js)
seeds+=(./calls_neo4j/reposts/genP03.js)
seeds+=(./calls_neo4j/reposts/genP04.js)
seeds+=(./calls_neo4j/reposts/genP05.js)
seeds+=(./calls_neo4j/reposts/genP06.js)
seeds+=(./calls_neo4j/reposts/genP07.js)
seeds+=(./calls_neo4j/reposts/genP08.js)
seeds+=(./calls_neo4j/reposts/genP09.js)
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
cd neo4j_data
declare -a records
records+=(records/tracks)
records+=(records/users)
records+=(records/playlists)
records+=(records/genres)
records+=(records/producers)
records+=(records/comments)
records+=(records/likes)
records+=(records/playlistTracks)
records+=(records/plays)
records+=(records/reposts)
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
  echo "records concatenated in '/Users/maxgektin/Documents/Remote/sdc/local/related-tracks/$i/all.csv'"
  cd ../..
done
unset records
echo `date`