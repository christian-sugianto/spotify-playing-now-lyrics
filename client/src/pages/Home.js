import React from 'react';
import { spotifyService } from '../services/spotify/spotifyService';

export default class Home extends React.Component {
  constructor() {
    super();
    const params = spotifyService.getHashParams();
    const token = spotifyService.setToken(params);
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }
  }
  async getNowPlaying() {
    const response = await spotifyService.getMyCurrentPlaybackState()
    this.setState({
      nowPlaying: {
        name: response.item.name,
        albumArt: response.item.album.images[0].url
      }
    });
  }
  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888/login' > Login to Spotify </a>
        <div>
          Now Playing: {this.state.nowPlaying.name}
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
        </div>
        {this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }
      </div>
    );
  }
}