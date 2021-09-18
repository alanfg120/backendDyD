import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";

import fileUpload from "express-fileupload";
import cors from "cors";

import expressJwt from "express-jwt";
import jwt from "express-jwt";


const optionsJwt: jwt.Options = {
  secret: process.env.SECRET_TOKEN as string,
  requestProperty: "token",
  algorithms: ["HS256"],
};

export class Servidor {
  app: Application;

  constructor(private port?: number | string) {    
    this.app = express();
    this.app.set("port", this.port || process.env.PORT || 3000);
    this.middlewares();
    this.routes();
  }

  middlewares(): void {
    this.app.use(express.static(__dirname + "/public"));
    this.app.use(cors());
    this.app.use(fileUpload());
    this.app.use(express.json());
    this.app.use(
      expressJwt(optionsJwt).unless({
        path: [
          "/usuarios/login",
          "/usuarios/add",
          "/usuarios/get/codigo_recuperacion",
          "/usuarios/anonimo/token",
          "/tips",
          /^\/tips\/.*/
        ],
      })
    );
    this.app.use(
      (
        err: ErrorRequestHandler,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        if (err.name === "UnauthorizedError") {
          res.status(401).send("Unauthorized");
        }
      }
    );
  }

  routes(): void {
  
  }

  async listen(): Promise<void> {
    await this.app.listen(this.app.get("port"));
    console.log("Server Ready", this.app.get("port"));
  }
}
