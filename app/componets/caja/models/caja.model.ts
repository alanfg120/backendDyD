import { Table, Column, Model, CreatedAt, HasMany } from "sequelize-typescript";
import { Gasto } from "../../gastos/models/gasto.model";
import { Inventario } from "../../inventarios/models/inventario.model";
import { Producto } from "../../productos/models/producto.model";


@Table({
  tableName: "cajas",
  updatedAt: false,
})
export class Caja extends Model<Caja> {

  @CreatedAt fecha: Date;
  @Column base: number;
  
  @HasMany(()=> Inventario)
  inventarios: Inventario[]

  @HasMany(()=> Gasto)
  gastos: Gasto[]
}
