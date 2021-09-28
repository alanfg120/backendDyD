import { Router, Request, Response } from "express";
import { sendResponse } from "../../../functions";
import { UsuarioRepositorio } from "../data/usuario.repositorio";



const router = Router();
const repositorio = new UsuarioRepositorio();

router.get("/", async (req: Request, res: Response) => {
  const response = await repositorio.getUsuarios();
  sendResponse(res, response);
});

router.post("/add", async (req: Request, res: Response) => {
  const caja = req.body;
  const response = await repositorio.addUsuario(caja);
  sendResponse(res, response);
});

router.put("/update", async (req: Request, res: Response) => {
  const id = req.body.id;
  const caja = req.body.caja;
  const response = await repositorio.updateUsuario(id,caja);
  sendResponse(res, response);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const response = await repositorio.deleteUsuario(+id);
  sendResponse(res, response);
});

export default router;