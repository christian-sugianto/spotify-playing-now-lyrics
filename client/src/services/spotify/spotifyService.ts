import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class SpotifyService {
  getHashParams = () => {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  setToken = (params: any) => {
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    return token;
  }

  getMyCurrentPlaybackState = async () => {
    await spotifyApi.getMyCurrentPlaybackState();
  }
}

export const spotifyService = new SpotifyService();
