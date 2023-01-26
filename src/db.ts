import { Pool } from "pg";

const connectionString = "postgres://yunbtkvv:lyPfnOS_xt5PQKrLjT-58C3eMlbznviP@babar.db.elephantsql.com/yunbtkvv";

const db = new Pool({connectionString});

export default db;