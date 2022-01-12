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
  const id = req.body.id_producto;
  const inventario = req.body;
  const response = await repositorio.updateInventario(id, inventario);
  sendResponse(res, response);
});

router.delete("/:id_producto/", async (req: Request, res: Response) => {
  const id_producto = req.params.id_producto;
  const response = await repositorio.deleteInventario(+id_producto);
  sendResponse(res, response);
});

export default router;
