import { Router, Request, Response } from "express";
import { sendResponse } from "../../../functions";
import { VentaRepositorio } from "../data/venta.reposirtorio";




const router = Router();
const repositorio = new VentaRepositorio();

router.get("/", async (req: Request, res: Response) => {
  const response = await repositorio.getVentas();
  sendResponse(res, response);
});

router.post("/add", async (req: Request, res: Response) => {
  const caja = req.body;
  const response = await repositorio.addVenta(caja);
  sendResponse(res, response);
});

router.put("/update", async (req: Request, res: Response) => {
  const id = req.body.id;
  const caja = req.body.caja;
  const response = await repositorio.updateVenta(id,caja);
  sendResponse(res, response);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const response = await repositorio.deleteVenta(+id);
  sendResponse(res, response);
});

export default router;