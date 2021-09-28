import {
    Table,
    Column,
    Model,
    Unique,
    CreatedAt,
  } from "sequelize-typescript";
  
  @Table({
    tableName: "productos",
    updatedAt: false,
  })
  export class Producto extends Model<Producto> {
    @Column nombre: string;
    @Column imagen: string;
    @Column descripcion: string;
    @Column cantidad: number;
    @Column precio: number;
    @Column costo: number;
    @CreatedAt fecha: Date;
  }
  