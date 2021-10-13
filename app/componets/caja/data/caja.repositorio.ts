import { ErrorResponse } from "../../../interfaces/Error.enum";
import { Gasto } from "../../gastos/models/gasto.model";
import { Inventario } from "../../inventarios/models/inventario.model";
import { Producto } from "../../productos/models/producto.model";
import { Caja } from "../models/caja.model";

export class CajaRepositorio {
  async getCajas(): Promise<Caja[] | ErrorResponse> {
    try {
      const cajas = await Caja.findAll({
        include: [
          {
            model: Inventario,
            include: [
              {
                model: Producto,
                attributes: { exclude: ["codigo", "cantidad"] },
              },
            ],
            attributes: { exclude: ["id_caja", "id_producto"] },
          },
          Gasto,
        ],
      });
      return cajas;
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }

  async addCaja(caja: any): Promise<Caja | ErrorResponse> {
    try {
      const newCaja = await Caja.create({ ...caja });
      return newCaja;
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
  async updateCaja(id: number, caja: any): Promise<boolean | ErrorResponse> {
    try {
      const [row, cajas] = await Caja.update({ ...caja }, { where: { id } });
      if (row > 0) return true;
      else return false;
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
  async deleteCaja(id: number): Promise<boolean | ErrorResponse> {
    try {
      const row = await Caja.destroy({ where: { id } });
      if (row > 0) return true;
      else return false;
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
}
