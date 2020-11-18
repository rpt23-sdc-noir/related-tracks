import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

class RelatedTracks extends React.Component {
  constructor(props) {
    super(props);
    this.song = window.location.pathname.substring(1);
    this.state = {
      currentSong: 1,
      related: [{song_id: 2, plays: 5, likes: 4, reposts: 3, image: 'https://i1.sndcdn.com/avatars-000153260008-nj3jj1-t200x200.jpg', song: 'Last Chance', band: 'LionsBesideUs'}]
    }

    this.updateRelated = this.updateRelated.bind(this);
  }

  updateRelated(data) {
    data.onPlaylists.forEach((item, index) => {
      this.addToRelated(item, index);
    });
  }

  addToRelated(id, index) {
    axios(`/relatedTracks/${id}`)
    .then(({ data }) => {
      data.song = `${10000000 - data.song_id} bottles of beer on the wall`;
      data.band = `${data.song_id} bottlecaps`;
      data.image = 'https://i1.sndcdn.com/avatars-000153260008-nj3jj1-t200x200.jpg';
      if (index === 0) {
        this.setState({
          related: [data],
        });
      } else {
        this.setState({
          related: this.state.related.concat(data),
        });
      }
    })
  }

  componentDidMount() {
    $.ajax(
      {
        url: `/relatedTracks/${this.song}`,
        data: {},
        success: data => this.updateRelated(data),
        error: err => console.log(err)
      }
    );
  }

  render() {
    return this.state.related.map((track) => {
    let plays = [<span key={"spanPlays" + track.song_id}>&#9658;</span>, ` ${track.plays}`];
    let likes = [<span key={"spanLikes" + track.song_id} >&#9829;</span>, ` ${track.likes}`];
    let reposts = [<span key={"spanReposts" + track.song_id}>&#10226;</span>, ` ${track.reposts}`];
    let comments = [<span key={"spanComments" + track.song_id}>&#128488;</span>, ` 3`];
    let image = [<img key={"image" + track.song_id} className="nicholas related-tracks band-image" src={track.image}/>];
    let song = [<p key={"song" + track.song_id} className="nicholas related-tracks song">{track.song}</p>]
    let band = [<p key={"band" + track.song_id} className="nicholas related-tracks band-name">{track.band}</p>]
    return (
      <>
        <div className="section">
        {image}
        <div className="test">
          {band}
          {song}
          <p key={"plays" + track.song_id} className="nicholas related-tracks plays">{plays}</p>
          <p key={"likes" + track.song_id} className="nicholas related-tracks likes">{likes}</p>
          <p key={"reposts" + track.song_id} className="nicholas related-tracks reposts">{reposts}</p>
          <p key={"comments" + track.song_id} className="nicholas related-tracks comments">{comments}</p>
        </div>
        </div>
      </>
    )})
  }
}

export default RelatedTracks;