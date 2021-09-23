import { Table, Column, Model, CreatedAt, ForeignKey, Unique, BelongsTo } from "sequelize-typescript";
import { Caja } from "../../caja/models/caja.model";
import { Producto } from "../../productos/models/producto.model";

@Table({
  tableName: "inventarios",
  updatedAt: false,
})
export class Inventario extends Model<Inventario> {
  @ForeignKey(() => Caja)
  @Column
  id_caja : number;

  @ForeignKey(() => Producto)
  @Unique
  @Column
  id_producto : number;

  @Column
  cantidad : number;

  @CreatedAt
  fecha : Date;

  @BelongsTo(() => Caja)
  categoria : Caja;

  @BelongsTo(() => Producto)
  productos : Producto;
}
