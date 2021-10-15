import {
  Table,
  Column,
  Model,
  CreatedAt,
  ForeignKey,
  PrimaryKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Caja } from "../../caja/models/caja.model";
import { Factura } from "../../facturas/models/factura.model";
import { Producto } from "../../productos/models/producto.model";

@Table({
  tableName: "ventas",
  updatedAt: false,
})
export class Venta extends Model<Venta> {
  
  @PrimaryKey
  @ForeignKey(() => Factura)
  @Column
  numero: number;

  @ForeignKey(() => Caja)
  @Column
  id_caja: number;

  @CreatedAt fecha: Date;

  @HasMany(() => Factura)
  productos : Factura[];

  @BelongsTo(() => Caja)
  caja : Caja;
}
