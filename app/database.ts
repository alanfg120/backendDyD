import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: "mysql",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  models: [__dirname + "/componets/**/models/*.model.ts"],
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf(".model")) === member.toLowerCase()
    );
  },
  logging: false,
});

export class DataBase {
  static async Init() {
    try {
      await sequelize.authenticate().then(async () => {
        try {
          await sequelize.sync(/* { force: true} */);
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.error("ERROR DATBASE INIT");
    }
  }
}
