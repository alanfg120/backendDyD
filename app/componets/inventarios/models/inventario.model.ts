import { Table, Column, Model, CreatedAt, ForeignKey, Unique, BelongsTo, PrimaryKey } from "sequelize-typescript";
import { Caja } from "../../caja/models/caja.model";
import { Producto } from "../../productos/models/producto.model";

@Table({
  tableName: "inventarios",
  updatedAt: false,
})
export class Inventario extends Model<Inventario> {
  @PrimaryKey
  @ForeignKey(() => Caja)
  @Column
  id_caja : number;
  
  @PrimaryKey
  @ForeignKey(() => Producto)
  @Column
  id_producto : number;

  @Column
  cantidad : number;

  @CreatedAt
  fecha : Date;

  @BelongsTo(() => Caja)
  caja : Caja;

  @BelongsTo(() => Producto)
  producto : Producto;
}
