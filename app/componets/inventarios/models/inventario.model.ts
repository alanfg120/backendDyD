import {
  Table,
  Column,
  Model,
  CreatedAt,
  ForeignKey,
  Unique,
  BelongsTo,
  PrimaryKey,
  Default,
} from "sequelize-typescript";
import { Caja } from "../../caja/models/caja.model";
import { Producto } from "../../productos/models/producto.model";

@Table({
  tableName: "inventarios",
  updatedAt: false,
})
export class Inventario extends Model<Inventario> {

  @PrimaryKey
  @ForeignKey(() => Producto)
  @Column
  id_producto: number;

  @Column
  cantidad: number;
  
  @Default(0)
  @Column
  cantidad_vendida: number;

  @CreatedAt
  fecha: Date;

  @BelongsTo(() => Producto)
  producto: Producto;
}
