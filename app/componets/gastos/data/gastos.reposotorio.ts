import { ErrorResponse } from "../../../interfaces/Error.enum";
import { Gasto } from "../../gastos/models/gasto.model";



export class GatosRepositorio {
    
  async getGastos(): Promise<Gasto[] | ErrorResponse> {
    try {
      const gastos = await Gasto.findAll({  });
      return gastos;
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
  
  async addGasto(caja: any): Promise<Gasto | ErrorResponse> {
    try {
      const newCaja = await Gasto.create({ ...caja });
      return newCaja;
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
  async updateGasto(id: number, gasto: any): Promise<boolean | ErrorResponse> {
    try {
      const [row, cajas] = await Gasto.update({ ...gasto }, { where: { id } });
      if(row> 0) return true;
      else return false
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
  async deleteGasto(id: number): Promise<boolean | ErrorResponse> {
    try {
      const row  = await Gasto.destroy({ where: { id } });
      if(row> 0) return true;
      else return false
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
}
 
