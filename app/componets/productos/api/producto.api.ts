import { Router, Request, Response } from "express";
import { sendResponse } from "../../../response";
import { ProductoRepositorio } from "../data/producto.repositorio";


const router = Router();
const repositorio = new ProductoRepositorio();

router.get("/", async (req: Request, res: Response) => {
  const response = await repositorio.getProductos();
  sendResponse(res, response);
});

router.post("/add", async (req: Request, res: Response) => {
  const caja = req.body;
  const response = await repositorio.addProducto(caja);
  sendResponse(res, response);
});

router.put("/update", async (req: Request, res: Response) => {
  const id = req.body.id;
  const caja = req.body.caja;
  const response = await repositorio.updateProducto(id,caja);
  sendResponse(res, response);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const response = await repositorio.deleteProducto(+id);
  sendResponse(res, response);
});

export default router;