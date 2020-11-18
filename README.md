# soundcloud-related-tracks

# track shape
{
  song_id: Number,
  plays: Number,
  likes: Number,
  reposts: Number,
  comments: Number,
  genre: String,
  onPlaylists: [Number],
  producedBy: String,
  likedBy: [Number],
  playedBy: [Number],
  repostedBy: [Number],
}

# related tracks song API request & response examples

### GET /relatedTracks/[id]

Example: http://localhost:3001/relatedTracks/[id]

Response body:
      {
        "song_id": [id],
        "plays": 5258,
        "likes": 766,
        "reposts": 83,
        "onPlaylists": [67,71,10],
        "likedBy": [65,89,4],
        "playedBy": [83,20,41],
        "repostedBy": [2,84,81],
        "genre": "spoken",
        "producedBy": "zaytoven",
      }

### POST /relatedTracks/[id]

Example: Create - POST http://localhost:3001/relatedTracks/[id]

Request body:
      {
        "song_id": [id],
        "plays": 45,
        "likes": 455,
        "reposts": 4545,
        "onPlaylists": [67,71,10],
        "likedBy": [65,89,4],
        "playedBy": [83,20,41],
        "repostedBy": [2,84,81],
        "genre": "ambient",
        "producedBy": "stock boy",
      }

Response body:
      "track [id] posted"


### PUT /relatedTracks/[id]

Example: Update - PUT http://localhost:3001/relatedTracks/[id]

Request body:
      {
        "song_id": [id],
        "plays": 45,
        "likes": 455,
        "reposts": 4545,
        "onPlaylists": [67,71,10],
        "likedBy": [65,89,4],
        "playedBy": [83,20,41],
        "repostedBy": [2,84,81],
        "genre": "ambient",
        "producedBy": "bialystock unt bloom",
      }

Response body:
      "track [id] put on"

### DELETE /relatedTracks/[id]

Example: http://localhost:3001/relatedTracks/[id]

Request body:
      {
        "song_id": [id],
      }

Response body:
      "track [id] deleted"