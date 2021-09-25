import { ErrorResponse } from "../../../interfaces/Error.enum";
import { Producto } from "../models/producto.model";




export class ProductoRepositorio {
    
  async getProductos(): Promise<Producto[] | ErrorResponse> {
    try {
      const Productos = await Producto.findAll({});
      return Productos;
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
  
  async addProducto(caja: any): Promise<Producto | ErrorResponse> {
    try {
      const newCaja = await Producto.create({ ...caja });
      return newCaja;
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
  async updateProducto(id: number, Producto: any): Promise<boolean | ErrorResponse> {
    try {
      const [row, cajas] = await Producto.update({ ...Producto }, { where: { id } });
      if(row> 0) return true;
      else return false
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
  async deleteProducto(id: number): Promise<boolean | ErrorResponse> {
    try {
      const row  = await Producto.destroy({ where: { id } });
      if(row> 0) return true;
      else return false
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
}
 
