import {
  Table,
  Column,
  Model,
  CreatedAt,
  HasMany,
  Default,
} from "sequelize-typescript";
import { Gasto } from "../../gastos/models/gasto.model";
import { Inventario } from "../../inventarios/models/inventario.model";
import { Producto } from "../../productos/models/producto.model";
import { Venta } from "../../ventas/models/venta.model";

@Table({
  tableName: "cajas",
  updatedAt: false,
})
export class Caja extends Model<Caja> {
  @Column base: number;

  @Default(false)
  @Column
  activa: boolean;

  @HasMany(() => Gasto)
  gastos: Gasto[];

  @CreatedAt fecha: Date;
}
