import {Request, NextFunction, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.models";
import userRepository from "../repositories/user.repository";


const authorizationRoute = Router();

authorizationRoute.post('/token', async (req: Request, res: Response, next: NextFunction) => {

    try {
        //cria const com a informação do cabeçalho
        const authorizationHeader = req.headers["authorization"];

        //Verifica se esta vazio. 
        if(!authorizationHeader){
            throw new ForbiddenError("Credencias não informadas")
        }
        
        //Cria a const com a informação do cabeçalho, mapeando type e token
        const [authorizationType, token] = authorizationHeader.split(' ');

        //Verifica se o tipo do token é Basic 
        //e se o toke foi passado
        if (authorizationType !== 'Basic' || !token){
            throw new ForbiddenError("Tipo de autenticação invalida");           
        }

        //Decodifica o toke para utf8
        const tokenContent = Buffer.from(token, 'base64').toString('utf8');
        //Separa username e password do token
        const [username, password] = tokenContent.split(':');

        //Verifica se os dados não foram passados
        if (!username || !password){
            throw new ForbiddenError("Credencias não preenchidas"); 
        }
        
        //Consulta se o username e password exitem no banco de dados.
        const user = await userRepository.findbyUsernameAndPassword(username, password);

        console.log(user);

        return res.sendStatus(200); 

    } catch (error) {
        next(error);
    }
    

})

export default authorizationRoute;