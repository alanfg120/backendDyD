import {
  Table,
  Column,
  Model,
  CreatedAt,
  ForeignKey,
  PrimaryKey,
  BelongsTo,
} from "sequelize-typescript";
import { Caja } from "../../caja/models/caja.model";
import { Producto } from "../../productos/models/producto.model";

@Table({
  tableName: "ventas",
  updatedAt: false,
})
export class Venta extends Model<Venta> {
  @PrimaryKey
  @Column
  numero: number;

  @PrimaryKey
  @ForeignKey(() => Producto)
  @Column
  id_producto: number;

  @ForeignKey(() => Caja)
  @Column
  id_caja: number;

  @Column cantidad: number;
  @CreatedAt fecha: Date;

  @BelongsTo(() => Producto)
  producto: Producto;

  @BelongsTo(() => Caja)
  caja: Caja;
}
