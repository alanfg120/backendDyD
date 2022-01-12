import { ErrorResponse } from "../../../interfaces/Error.enum";
import { Opcion } from "../models/opcion.model";

export class OpcionesRepositorio {
  async getOpciones(): Promise<Opcion | ErrorResponse> {
    try {
      const opciones =  await Opcion.findAll();
      return opciones[0];
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
  async updateOpciones(opcion: any): Promise<boolean | ErrorResponse> {
    try {
      const [row,data] = await Opcion.update({...opcion},{where:{id:opcion.id}});
      if(row > 0)
        return true
      else return false;
    } catch (error) {
      console.log(error);
      return ErrorResponse.errorDataBase;
    }
  }
}
