import { Table, Column, Model, CreatedAt, HasMany } from "sequelize-typescript";


@Table({
  tableName: "cajas",
  updatedAt: false,
})
export class Caja extends Model<Caja> {

  @CreatedAt fecha: Date;
  @Column base: number;


}
