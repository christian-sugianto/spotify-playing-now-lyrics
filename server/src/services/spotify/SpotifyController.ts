import { spotifyLogin, spotifyCallback, spotifyRefreshToken } from "./authentication/spotifyAuthentication";
import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
  return spotifyLogin(req, res);
};

export const callback = (req: Request, res: Response) => {
  return spotifyCallback(req, res);
}

export const refreshToken = (req: Request, res: Response) => {
  return spotifyRefreshToken(req, res);
}