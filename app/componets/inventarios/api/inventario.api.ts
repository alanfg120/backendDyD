import { Router, Request, Response } from "express";
import { sendResponse } from "../../../functions";
import { InventarioRepositorio } from "../data/inventario.repositorio";

const router = Router();
const repositorio = new InventarioRepositorio();

router.get("/", async (req: Request, res: Response) => {
  const response = await repositorio.getInventarios();
  sendResponse(res, response);
});

router.post("/add", async (req: Request, res: Response) => {
  const caja = req.body;
  const response = await repositorio.addInventario(caja);
  sendResponse(res, response);
});

router.put("/update", async (req: Request, res: Response) => {
  const id = req.body.id;
  const caja = req.body.caja;
  const response = await repositorio.updateInventario(id,caja);
  sendResponse(res, response);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const response = await repositorio.deleteInventario(+id);
  sendResponse(res, response);
});

export default router;