import db from "../db";
import User from "../models/user.models";
import DatabaseError from "../models/errors/dataBase.error.moldel";

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
        
        try {
            //cria o sql para buscar os usuarios
            const query = `
                SELECT uuid, username 
                FROM application_user
                WHERE uuid = $1`
            ;
            const findUser = await db.query<User>(query, [uuid]);
    
            const [user] = findUser.rows;
    
            return user
            
        } catch (error) {
            throw new DatabaseError("Erro na consulta por ID", error);
        }
    }


    //Cria um novo usuario
    async createUser(user: User): Promise<string> {
        //cria o sql para inserir o novo usuario
        const script = 
            `INSERT INTO application_user(
                username, password
            ) 
            VALUES($1, crypt($2, 'my_salt'))
            RETURNING uuid, username
        `;
        
        const valores = [user.username, user.password];

        const {rows} = await db.query<User>(script, valores);       
        const [createUser] = rows

        return createUser.username;
    }

    //Editar usuario
    async updateUser(user:User): Promise<void> {

        const script = `
            UPDATE application_user 
            SET username = $1, password = crypt($2, 'my-salt')
            WHERE uuid = $3
            RETURNING uuid
        `
        const valores = [user.username, user.password, user.uuid];
        await db.query<User>(script, valores);
    }

    //Deletar usuario
    async deleteUser(uuid: string): Promise<void> {

        const script = `
            DELETE 
            FROM application_user 
            WHERE uuid = $1
        `;

        const valor = [uuid];
        await db.query(script, valor);
    }

}

export default new UserRepository();