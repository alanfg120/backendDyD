import { UploadedFile } from "express-fileupload";
import {
  ErrorHttpResponse,
  ErrorResponse,
} from "../../../interfaces/Error.enum";
import { Producto } from "../models/producto.model";
import fs from "fs-extra";
export class ProductoRepositorio {
  async getProductos(): Promise<Producto[] | ErrorHttpResponse> {
    try {
      const Productos = await Producto.findAll();
      return Productos;
    } catch (error) {
      console.log(error);
      return { error: ErrorResponse.errorDataBase };
    }
  }

  async addProducto(
    caja: any,
    file: UploadedFile
  ): Promise<Producto | ErrorHttpResponse> {
    try {
      const newProducto = await Producto.create({ ...caja });
      await file.mv(`${process.env.PRODUCTOS_FOLDER}/${newProducto.id}.jpg`);
      const [rowAfect, productos] = await Producto.update(
        { imagen: `${newProducto.id}.jpg` },
        { where: { id: newProducto.id } }
      );
      if (rowAfect > 0) {
        newProducto.imagen = `${newProducto.id}.jpg`;
        return newProducto;
      } else throw new Error("error al crear el producto");
    } catch (error) {
      console.log(error);
      return { error: ErrorResponse.errorDataBase };
    }
  }
  async updateProducto(
    id: number,
    producto: any,
    file?: UploadedFile
  ): Promise<boolean | ErrorHttpResponse> {
    try {
      const [row, cajas] = await Producto.update(
        { ...producto },
        { where: { id } }
      );
      if (file) await file.mv(`${process.env.PRODUCTOS_FOLDER}/${id}.jpg`);
      if (row > 0) return true;
      else return false;
    } catch (error) {
      console.log(error);
      return { error: ErrorResponse.errorDataBase };
    }
  }
  async deleteProducto(id: number): Promise<boolean | ErrorHttpResponse> {
    try {
      const row = await Producto.destroy({ where: { id } });
      if (row > 0) {
        await fs.remove(`${process.env.PRODUCTOS_FOLDER}/${id}.jpg`);
        return true;
      } else return false;
    } catch (error) {
      console.log(error);
      return { error: ErrorResponse.errorDataBase };
    }
  }
}
