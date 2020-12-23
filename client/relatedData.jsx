import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class RelatedTracks extends React.Component {
  constructor(props) {
    super(props);
    this.song = window.location.pathname.substring(1);
    this.state = {
      currentSong: 1,
      related: [{ song_id: 2, plays: 5, likes: 4, reposts: 3, }],
      images: [
                'https://i1.sndcdn.com/avatars-000153260008-nj3jj1-t200x200.jpg',
                'https://i1.sndcdn.com/avatars-000153260008-nj3jj1-t200x200.jpg',
                'https://i1.sndcdn.com/avatars-000153260008-nj3jj1-t200x200.jpg',
              ],
      names: [
                'First of Her Name',
                '"Marcia, Marcia, Marcia"',
                'last nite',
              ],
      bands: [
                'Siouxsie & the Banshees',
                'Yun Jan',
                'The Strokes',
              ],
    }

    this.updateRelated = this.updateRelated.bind(this);

    axios.get(`/relatedTracks/${this.song}`)
    .then(({ data }) => {
      this.updateRelated(data);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  updateRelated(data) {
    console.log('data: ', data);
    if (typeof data[0] === 'string') {
      data.forEach((datum, index) => {
        data[index] = JSON.parse(datum);
      });
    }
    this.setState({
      related: data,
    });
    data.forEach((track, index) => {

      axios.get(`http://localhost:3005/songdata/${track.song_id}`)
      .then(({ data }) => {
        this.updateTitleImg(data, index);
      })
      .catch((err) => {
        console.error('Name & Image', err);
      });

      axios.get(`http://localhost:2000/artistBio/${track.song_id}`)
      .then(({ data }) => {
        this.updateBandName(data, index);
      })
      .catch((err) => {
        console.error('Band Name', err);
      });
    });
  }

  updateTitleImg(data, index) {
    let images = [...this.state.images];
    let names = [...this.state.names];
    images[index] = data.songImage;
    names[index] = data.songName;
    this.setState({
      images,
      names,
    });
  }

  updateBandName(data, index) {
    let bands = [...this.state.bands];
    bands[index] = data.bandName;
    this.setState({
      bands,
    });
  }

  componentDidMount() {

  }

  render() {
    return this.state.related.map((track, index) => {
    let plays = [<span key={"spanPlays" + track.song_id}>&#9658;</span>, ` ${track.plays}`];
    let likes = [<span key={"spanLikes" + track.song_id} >&#9829;</span>, ` ${track.likes}`];
    let reposts = [<span key={"spanReposts" + track.song_id}>&#10226;</span>, ` ${track.reposts}`];
    let comments = [<span key={"spanComments" + track.song_id}>&#128488;</span>, ` 3`];
    let image = [<img key={"image" + track.song_id} className="nicholas related-tracks band-image" src={this.state.images[index]}/>];
    let song = [<p key={"song" + track.song_id} className="nicholas related-tracks song">{this.state.names[index]}</p>];
    let band = [<p key={"band" + track.song_id} className="nicholas related-tracks band-name">{this.state.bands[index]}</p>];
    return (
      <div key={`song ${index}`}>
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
      </div>
    )})
  }
};

export default RelatedTracks;
