import { Router, Request, Response } from "express";
import { sendResponse } from "../../../functions";
import { OpcionesRepositorio } from "../data/opciones.repocitorio";


const router = Router();
const repositorio = new OpcionesRepositorio();

router.get("/", async (req: Request, res: Response) => {
  const response = await repositorio.getOpciones();
  sendResponse(res, response);
});

router.put("/", async (req: Request, res: Response) => {
  const opcion = req.body;
  const response = await repositorio.updateOpciones(opcion);
  sendResponse(res, response);
});


export default router;