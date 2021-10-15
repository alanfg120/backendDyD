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
import { Venta } from "../../ventas/models/venta.model";
  
  @Table({
    tableName: "facturas",
    updatedAt: false,
  })
  export class Factura extends Model<Factura> {
    
    @PrimaryKey
    @ForeignKey(() => Venta)
    @Column
    numero: number;
  
    @PrimaryKey
    @ForeignKey(() => Producto)
    @Column
    id_producto: number;
  
    @Column cantidad: number;
    @CreatedAt fecha: Date;
  
    @BelongsTo(() => Producto)
    producto : Producto;

  }
  