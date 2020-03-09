import React from 'react';
import { spotifyService } from '../services/spotify/SpotifyService';

interface Props {
}

interface State {
  loggedIn: boolean,
  nowPlaying: {
    name: string,
    albumArt: string
  }
}

export default class Home extends React.Component<Props, State> {
  constructor(props: {}) {
    super(props);
    const params = spotifyService.getHashParams();
    const token = spotifyService.setToken(params);
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }
  }
  async getNowPlaying() {
    const response = await spotifyService.getMyCurrentPlaybackState();
    if (response) {
      response.item && this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url
        }
      });
    }
  }
  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888/login' > Login to Spotify </a>
        <div>
          Now Playing: {this.state.nowPlaying.name}
        </div>
        <div>
          {this.state.nowPlaying.albumArt &&
            <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} alt="Now Playing Album Art" />
          }
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