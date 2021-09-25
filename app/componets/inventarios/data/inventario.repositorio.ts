import { ErrorResponse } from "../../../interfaces/Error.enum";
import { Inventario } from "../models/inventario.model";




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
  
  async addInventario(caja: any): Promise<Inventario | ErrorResponse> {
    try {
      const newCaja = await Inventario.create({ ...caja });
      return newCaja;
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
  async updateInventario(id: number, Inventario: any): Promise<boolean | ErrorResponse> {
    try {
      const [row, cajas] = await Inventario.update({ ...Inventario }, { where: { id } });
      if(row> 0) return true;
      else return false
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
  async deleteInventario(id: number): Promise<boolean | ErrorResponse> {
    try {
      const row  = await Inventario.destroy({ where: { id } });
      if(row> 0) return true;
      else return false
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
}
 
