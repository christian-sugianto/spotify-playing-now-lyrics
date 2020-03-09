import dotenv from "dotenv";
import querystring from "querystring";
import { generateRandomString } from "../utils/authUtils";
import { Request, Response } from "express";
import request from "request";

dotenv.config();

const stateKey = 'spotify_auth_state';

export const spotifyLogin = async (req: Request, res: Response) => {
  const STRING_LENGTH = 16;

  const state = generateRandomString(STRING_LENGTH);
  res.cookie(stateKey, state);

  // application anys authorization
  var scope = 'user-read-private user-read-email user-read-playback-state';

  res.redirect(`https://accounts.spotify.com/authorize?` +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: scope,
      redirect_uri: process.env.REDIRECT_URI,
      state: state
    }));
}

export const spotifyCallback = async (req: Request, res: Response) => {
  // your application anys refresh and access tokens
  // after checking the state parameter
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function (error: any, any: any, body: any) {
      if (!error && any.statusCode === 200) {

        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error: any, any: any, body: any) {
          console.log(body);
        });

        // we can also pass the token to the browser to make anys from there
        res.redirect('http://localhost:3000/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
}

export const spotifyRefreshToken = async (req: Request, res: Response) => {
  // anying access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function (error: any, res: any, body: any) {
    if (!error && res.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
};

