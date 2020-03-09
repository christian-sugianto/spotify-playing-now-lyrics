import { login, callback, refreshToken } from "./SpotifyController";
import { Response, Request } from "express";

export default [
  {
    path: "/login",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        await login(req, res);
      }
    ]
  },
  {
    path: "/callback",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        await callback(req, res);
      }
    ]
  },
  {
    path: "/refresh_token",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        await refreshToken(req, res);
      }
    ]
  }
];
