import { UploadedFile } from "express-fileupload";
import {
  ErrorHttpResponse,
  ErrorResponse,
} from "../../../interfaces/Error.enum";
import { Producto } from "../../productos/models/producto.model";
import { Inventario } from "../models/inventario.model";
import cvsToJson from "csvtojson";
export class InventarioRepositorio {
  async getInventarios(): Promise<Inventario[] | ErrorResponse> {
    try {
      const inventarios = await Inventario.findAll({});
      return inventarios;
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }

  async addInventario(
    inventario: any
  ): Promise<Inventario | ErrorHttpResponse> {
    try {
      const newInventario = await Inventario.create({ ...inventario });
      const sendInventario = await Inventario.findOne({
        where: { id_producto: newInventario.id_producto },
        include: [Producto],
        attributes: { exclude: ["id_caja", "id_producto"] },
      });
      return sendInventario as Inventario;
    } catch (error) {
      console.log(error);
      return { error: ErrorResponse.errorDataBase };
    }
  }
  async updateInventario(
    id_producto: number,
    inventario: any
  ): Promise<boolean | ErrorResponse> {
    try {
      const [row, cajas] = await Inventario.update(
        { ...inventario },
        { where: { id_producto } }
      );
      if (row > 0) return true;
      else return false;
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
  async deleteInventario(
    id_producto: number,
    id_caja: number
  ): Promise<boolean | ErrorResponse> {
    try {
      const row = await Inventario.destroy({ where: { id_producto, id_caja } });
      if (row > 0) return true;
      else return false;
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }

  async addPlantillaInventario(
    fileCvs: UploadedFile
  ): Promise<boolean | ErrorHttpResponse> {
    try {
      await fileCvs.mv(`${process.env.PLANTILLAS_FOLDER}/plantilla.cvs`);
      const json = await cvsToJson().fromFile(
        `${process.env.PLANTILLAS_FOLDER}/plantilla.cvs`
      );
      console.log(json);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
