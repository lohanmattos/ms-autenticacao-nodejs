import { Pool } from "pg";
import dotenv from "dotenv"
dotenv.config();

//usando variaves de ambiente para acessar a chave do banco de dados.
const connectionString = process.env.AUTH_BD

const db = new Pool({connectionString});

export default db;