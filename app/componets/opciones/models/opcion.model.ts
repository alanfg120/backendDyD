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
  tableName: "opciones",
  updatedAt: false,
})
export class Opcion extends Model<Opcion> {
  @Column numero_mesas: number;
  @CreatedAt fecha: Date;
}
