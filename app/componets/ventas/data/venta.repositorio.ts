import {
  ErrorHttpResponse,
  ErrorResponse,
} from "../../../interfaces/Error.enum";
import { Caja } from "../../caja/models/caja.model";
import { Factura } from "../../facturas/models/factura.model";
import { InventarioRepositorio } from "../../inventarios/data/inventario.repositorio";
import { Producto } from "../../productos/models/producto.model";
import { Venta } from "../models/venta.model";

interface ProductoFacturado {
  cantidad: number;
  id_producto: number;
}

export class VentaRepositorio {

  async getVentas(): Promise<Venta[] | ErrorHttpResponse> {
    try {
      const ventas = await Venta.findAll({
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
      });
      return ventas;
    } catch (error) {
      console.log(error);
      return { error: ErrorResponse.errorDataBase };
    }
  }
  async getVentasByMesa(
    mesa: number
  ): Promise<Venta[] | ErrorHttpResponse> {
    try {
      const ventas = await Venta.findAll({
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
        where: {mesa,pagada: false}
      }
      );
      return ventas;
    } catch (error) {
      console.log(error);
      return { error: ErrorResponse.errorDataBase };
    }
  }

  async addVenta(venta: any): Promise<boolean | ErrorResponse> {
    try {
      const numero = (await this.getMaxVentaId()) + 1;
      const newVenta = await Venta.create({ numero, id_caja: venta.id_caja });
      await this.addFacturaAndUpdateInventario(venta.productos, numero);
      return true;
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
  async updateVenta(id: number, Venta: any): Promise<boolean | ErrorResponse> {
    try {
      const [row, cajas] = await Venta.update({ ...Venta }, { where: { id } });
      if (row > 0) return true;
      else return false;
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
  async deleteVenta(id: number): Promise<boolean | ErrorResponse> {
    try {
      const row = await Venta.destroy({ where: { id } });
      if (row > 0) return true;
      else return false;
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }

  private async getMaxVentaId(): Promise<number> {
    return (await Venta.max("numero")) || 0;
  }

  private async addFacturaAndUpdateInventario(
    productos: ProductoFacturado[],
    numero: number
  ) {
    for (let index = 0; index < productos.length; index++) {
      const id_producto = productos[index].id_producto;
      const cantidad = productos[index].cantidad;
      await Factura.create({ numero, id_producto, cantidad });
      await InventarioRepositorio.updateInventarioOfVenta(
        cantidad,
        id_producto
      );
    }
  }
}
