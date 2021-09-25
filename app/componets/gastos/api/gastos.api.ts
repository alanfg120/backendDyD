import { Router, Request, Response } from "express";
import { sendResponse } from "../../../response";
import { GatosRepositorio } from "../data/gastos.reposotorio";

const router = Router();
const repositorio = new GatosRepositorio();

router.get("/", async (req: Request, res: Response) => {
  const response = await repositorio.getGastos();
  sendResponse(res, response);
});

router.post("/add", async (req: Request, res: Response) => {
  const caja = req.body;
  const response = await repositorio.addGasto(caja);
  sendResponse(res, response);
});

router.put("/update", async (req: Request, res: Response) => {
  const id = req.body.id;
  const caja = req.body.caja;
  const response = await repositorio.updateGasto(id,caja);
  sendResponse(res, response);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const response = await repositorio.deleteGasto(+id);
  sendResponse(res, response);
});

export default router;