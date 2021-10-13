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

import CajasRoute from "./componets/caja/api/caja.api";
import ProductosRoute from "./componets/productos/api/producto.api";
import InventariosRoute from "./componets/inventarios/api/inventario.api";
import GastosRoute from "./componets/gastos/api/gastos.api";
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
    this.app.use(cors());
    this.app.use(express.static(__dirname + "/public"));
    this.app.use(fileUpload());
    this.app.use(express.json());
    /*    this.app.use(
      expressJwt(optionsJwt).unless({
        path: [
         
        ],
      })
    ); */
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
    this.app.use("/cajas", CajasRoute);
    this.app.use("/productos", ProductosRoute);
    this.app.use("/inventarios", InventariosRoute);
    this.app.use("/gastos", GastosRoute);
  }

  async listen(): Promise<void> {
    await this.app.listen(this.app.get("port"));
    console.log("Server Ready", this.app.get("port"));
  }
}
