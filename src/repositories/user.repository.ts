import db from "../db";
import User from "../models/user.models";

class UserRepository {
    //cria uma função assincrona , cria uma promesa do tipo User
    async findAllUsers(): Promise<User[]>{
        //cria o sql para buscar os usuarios
        const query = `
            SELECT uuid, username 
            FROM application_user
        `
        //cria uma constate para esperar o resultado da pesquisa no bd
        const resultado = await db.query<User>(query);

        //seleciona a ros que veio da pesquisa no banco
        const rows = resultado.rows;

        //retorna os dados do bd, ou um array vazio.
        return rows || [];
    }

    //Lista um usuario pelo uuid
    async finldById(uuid: string): Promise<User> {
        //cria o sql para buscar os usuarios
        const query = `
            SELECT uuid, username 
            FROM application_user
            WHERE uuid = $1`
        ;
        const findUser = await db.query<User>(query, [uuid]);

        const [user] = findUser.rows;

        return user
    }


    //Cria um novo usuario
    async createUser(user: User): Promise<User> {
        //cria o sql para inserir o novo usuario
        const sql = 
            `INSERT INTO application_user(username, password) 
             VALUES($1,$2)`
        ;

        const createUser = await db.query<User>(sql, [user.username, user.password]);

        return createUser.rows[0];
    }
}

export default new UserRepository();