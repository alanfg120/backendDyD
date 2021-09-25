import { ErrorResponse } from "../../../interfaces/Error.enum";
import { Usuario } from "../models/usuario.model";





export class UsuarioRepositorio {
    
  async getUsuarios(): Promise<Usuario[] | ErrorResponse> {
    try {
      const Usuarios = await Usuario.findAll({});
      return Usuarios;
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
  
  async addUsuario(caja: any): Promise<Usuario | ErrorResponse> {
    try {
      const newCaja = await Usuario.create({ ...caja });
      return newCaja;
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
  async updateUsuario(id: number, Usuario: any): Promise<boolean | ErrorResponse> {
    try {
      const [row, cajas] = await Usuario.update({ ...Usuario }, { where: { id } });
      if(row> 0) return true;
      else return false
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
  async deleteUsuario(id: number): Promise<boolean | ErrorResponse> {
    try {
      const row  = await Usuario.destroy({ where: { id } });
      if(row> 0) return true;
      else return false
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
}
 
