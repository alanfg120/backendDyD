import {
  Table,
  Column,
  Model,
  CreatedAt,
  ForeignKey,
  PrimaryKey,
  HasMany,
  Default,
} from "sequelize-typescript";
import { Factura } from "../../facturas/models/factura.model";


@Table({
  tableName: "ventas",
  updatedAt: false,
})
export class Venta extends Model<Venta> {
  
  @PrimaryKey
  @ForeignKey(() => Factura)
  @Column
  numero: number;
   
  @Column
  mesa: number;

  @Default(false)
  @Column
  pagada: boolean;

  @CreatedAt fecha: Date;

  @HasMany(() => Factura)
  productos : Factura[];

}
