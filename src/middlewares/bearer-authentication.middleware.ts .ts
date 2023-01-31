import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbidden.error.models";
import JWT from "jsonwebtoken"; 

async function bearerAuthenticationMiddleware(req: Request, res: Response, next: NextFunction){
    
    try {
        //Pegando os dados pelo cabeçalho
        const authorizationHeader = req.headers['authorization'];
        //Verificando se não está vazio.
        if(!authorizationHeader){
            throw new ForbiddenError("Credencias não informadas.");
        }

        //Separada o conteudo em duas const
        const [authorizationType, token] = authorizationHeader.split(' ');

        //Verifica o Tipo do Token
        if (authorizationType !== 'Bearer' || !token){
            throw new ForbiddenError("Tipo de autenticação invalida");           
        }

        //Verifica se o token e válido.
        const tokenPayload = JWT.verify(token, "my_secret_key");

        //Verificar se o tipo do tokenPayload 
        if(typeof tokenPayload !== 'object' || !tokenPayload.sub){
            throw new ForbiddenError("Token invalido.")
        }

        //uuid do usuario
        const user = {
            uuid: tokenPayload.sub,
            username: tokenPayload.username
        };

        //add user ou corpo da requisição
        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
}

export default bearerAuthenticationMiddleware;