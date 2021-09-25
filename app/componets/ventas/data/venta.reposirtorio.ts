import { ErrorResponse } from "../../../interfaces/Error.enum";
import { Venta } from "../models/venta.model";





export class VentaRepositorio {
    
  async getVentas(): Promise<Venta[] | ErrorResponse> {
    try {
      const Ventas = await Venta.findAll({});
      return Ventas;
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
  
  async addVenta(caja: any): Promise<Venta | ErrorResponse> {
    try {
      const newCaja = await Venta.create({ ...caja });
      return newCaja;
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
  async updateVenta(id: number, Venta: any): Promise<boolean | ErrorResponse> {
    try {
      const [row, cajas] = await Venta.update({ ...Venta }, { where: { id } });
      if(row> 0) return true;
      else return false
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
  async deleteVenta(id: number): Promise<boolean | ErrorResponse> {
    try {
      const row  = await Venta.destroy({ where: { id } });
      if(row> 0) return true;
      else return false
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
}
 
