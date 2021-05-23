import Server from "express";

const Router = Server.Router;

export {
  Response,
  NextFunction,
  Application,
  Router as RouterType,
  json as BodyParser,
  urlencoded as Encoded
} from "express";
export { Server, Router };
