import {
  Table,
  Column,
  Model,
  Unique,
  CreatedAt,
} from "sequelize-typescript";

@Table({
  tableName: "usuarios",
  updatedAt: false,
})
export class Usuario extends Model<Usuario> {
  @Column imagen!: string;
  @Unique
  @Column
  usuario!: string;
  @Column password!: string;
  @CreatedAt fecha!: Date;
  @Column rol!: string;
}
