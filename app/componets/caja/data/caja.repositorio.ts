import { Includeable } from "sequelize/types";
import {
  ErrorHttpResponse,
  ErrorResponse,
} from "../../../interfaces/Error.enum";
import { Factura } from "../../facturas/models/factura.model";
import { Gasto } from "../../gastos/models/gasto.model";
import { Inventario } from "../../inventarios/models/inventario.model";
import { Producto } from "../../productos/models/producto.model";
import { Venta } from "../../ventas/models/venta.model";
import { Caja } from "../models/caja.model";

const includeOptions: Includeable[] = [
  {
    model: Inventario,
    include: [
      {
        model: Producto,
        attributes: { exclude: ["codigo", "cantidad", "fecha"] },
      },
    ],
    attributes: { exclude: ["id_caja", "id_producto", "fecha"] },
  },
  Gasto,
  {
    model: Venta,
    include: [
      {
        model: Factura,
        attributes: { exclude: ["numero", "id_producto", "fecha"] },
        include: [
          {
            model: Producto,
            attributes: {
              exclude: ["codigo", "cantidad", "fecha"],
            },
          },
        ],
      },
    ],
  },
];

export class CajaRepositorio {
  async getCajas(all: boolean = true): Promise<Caja[] | ErrorResponse> {
    try {
      const cajas = await Caja.findAll({
        include: includeOptions,
        order: [[{ model: Inventario, as: "inventarios" }, "fecha", "ASC"]],
        where: all ? undefined : { activa: true },
      });
      return cajas;
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }

  async getCajaByFecha(): Promise<Caja[] | ErrorHttpResponse> {
    try {
      const caja = await Caja.findAll({
        where: { fecha: "14/10/2021" },
        include: includeOptions,
      });
      return caja;
    } catch (error) {
      console.log(error);
      return { error: ErrorResponse.errorDataBase };
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

  async activarCaja(
    id: number,
    activa: boolean
  ): Promise<boolean | ErrorHttpResponse> {
    try {
      const [rows, cajas] = await Caja.update({ activa }, { where: { id } });
      if (rows > 0) return true;
      else return false;
    } catch (error) {
      console.log(error);
      return { error: ErrorResponse.errorDataBase };
    }
  }
}
