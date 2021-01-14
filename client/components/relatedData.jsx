// import React from 'react';
const React = require('react');

class RelatedTracks extends React.Component {
  constructor(props) {
    super(props);
    // this.song = window.location.pathname.substring(1);
    this.state = {
      tracks: this.props.tunes,
    }

    // this.updateRelated = this.updateRelated.bind(this);

    // axios.get(`/relatedTracks/${this.song}`)
    // .then(({ data }) => {
    //   this.updateRelated(data);
    // })
    // .catch((err) => {
    //   console.error(err);
    // });
  }

  // updateRelated(data) {
  //   console.log('data: ', data);
  //   if (typeof data[0] === 'string') {
  //     data.forEach((datum, index) => {
  //       data[index] = JSON.parse(datum);
  //     });
  //   }
  //   this.setState({
  //     related: data,
  //   });
  //   data.forEach((track, index) => {

  //     axios.get(`http://localhost:3005/songdata/${track.song_id}`)
  //     .then(({ data }) => {
  //       this.updateTitleImg(data, index);
  //     })
  //     .catch((err) => {
  //       console.error('Name & Image', err);
  //     });

  //     axios.get(`http://localhost:2000/artistBio/${track.song_id}`)
  //     .then(({ data }) => {
  //       this.updateBandName(data, index);
  //     })
  //     .catch((err) => {
  //       console.error('Band Name', err);
  //     });
  //   });
  // }

  // updateTitleImg(data, index) {
  //   let images = [...this.state.images];
  //   let names = [...this.state.names];
  //   images[index] = data.songImage;
  //   names[index] = data.songName;
  //   this.setState({
  //     images,
  //     names,
  //   });
  // }

  // updateBandName(data, index) {
  //   let bands = [...this.state.bands];
  //   bands[index] = data.bandName;
  //   this.setState({
  //     bands,
  //   });
  // }

  // componentDidMount() {

  // }

  render() {
    return this.state.tracks.map((track, index) => {
    let plays = [<span key={"spanPlays" + track.song_id}>plays:</span>, ` ${track.plays}`];
    let likes = [<span key={"spanLikes" + track.song_id} >likes:</span>, ` ${track.likes}`];
    let reposts = [<span key={"spanReposts" + track.song_id}>reposts:</span>, ` ${track.reposts}`];
    let comments = [<span key={"spanComments" + track.song_id}>comments:</span>, ` ${track.comments}`];
    let image = [<img key={"image" + track.song_id} className="nicholas related-tracks band-image" src={track.image}/>];
    let song = [<p key={"song" + track.song_id} className="nicholas related-tracks song">{track.name}</p>];
    let band = [<p key={"band" + track.song_id} className="nicholas related-tracks band-name">{track.band}</p>];
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
    )});
  }
};

export default RelatedTracks;
