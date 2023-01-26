--Habilita o recurso de uuid_gererate_v4. Para o db PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--Habilita o recurso de criptografica no db PostgreSQL
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

--Cria a tabela 'applicacion_user' se ela não existir
CREATE TABLE IF NOT EXISTS application_user(
    uuid uuid DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
)
--Cria um usario admin com senha criptografada com um recurso do próprio banco de dados.
INSERT INTO application_user(username, password) values ('admin', crypt('admin', 'my_salt'));