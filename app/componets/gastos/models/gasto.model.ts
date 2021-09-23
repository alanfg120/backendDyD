import {
    Table,
    Column,
    Model,
    CreatedAt,
    ForeignKey,
  } from "sequelize-typescript";
import { Caja } from "../../caja/models/caja.model";
  
  @Table({
    tableName: "gastos",
    updatedAt: false,
  })
  export class Gasto extends Model<Gasto> {
    @Column
    descripcion: string;
    @ForeignKey(() => Caja)
    @Column
    id_caja: number;
    @CreatedAt fecha: Date;
  }