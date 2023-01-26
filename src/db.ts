import { Pool } from "pg";
import auth from "../auth.db";

const connectionString = auth

const db = new Pool({connectionString});

export default db;