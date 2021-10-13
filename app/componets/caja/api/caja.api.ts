import { Router, Request, Response } from "express";
import { sendResponse } from "../../../functions";
import { CajaRepositorio } from "../data/caja.repositorio";

const router = Router();
const repositorio = new CajaRepositorio();

router.get("/", async (req: Request, res: Response) => {
  const response = await repositorio.getCajas();
  sendResponse(res, response);
});

router.post("/add", async (req: Request, res: Response) => {
  const caja = req.body;
  const response = await repositorio.addCaja(caja);
  sendResponse(res, response);
});

router.put("/update", async (req: Request, res: Response) => {
  const id = req.body.id;
  const caja = req.body;
  const response = await repositorio.updateCaja(id,caja);
  sendResponse(res, response);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const response = await repositorio.deleteCaja(+id);
  sendResponse(res, response);
});

export default router;