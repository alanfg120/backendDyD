import { Servidor } from "./server";
import { DataBase } from "./database";
import { Usuario } from "./componets/usuarios/models/usuario.model";



async function main() {
  const app = new Servidor();
  await app.listen();
  await DataBase.Init();
}

main();
