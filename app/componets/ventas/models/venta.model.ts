import {
  Table,
  Column,
  Model,
  CreatedAt,
  ForeignKey,
  PrimaryKey,
} from "sequelize-typescript";
import { Producto } from "../../productos/models/producto.model";

@Table({
  tableName: "ventas",
  updatedAt: false,
})
export class Venta extends Model<Venta> {
  @PrimaryKey
  @Column
  numero: number;
  @ForeignKey(() => Producto)
  @Column
  id_producto: number;

  @Column cantidad: number;
  @CreatedAt fecha: Date;
}
