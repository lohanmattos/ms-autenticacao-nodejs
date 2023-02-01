import {Request, NextFunction, Response, Router } from "express";
import JWT from "jsonwebtoken"; 
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";
import ForbiddenError from "../models/errors/forbidden.error.models";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware.ts ";


const authorizationRoute = Router();

authorizationRoute.post('/token/validate', jwtAuthenticationMiddleware, (req: Request, res: Response, next: NextFunction)=>{
    res.sendStatus(StatusCodes.OK);
});

authorizationRoute.post('/token', basicAuthenticationMiddleware, (req: Request, res: Response, next: NextFunction) => {
      /*
        sub (subject) = Entidade à quem o token pertence, normalmente o ID do usuário;
        iss (issuer) = Emissor do token;
        exp (expiration) = Timestamp de quando o token irá expirar;
        iat (issued at) = Timestamp de quando o token foi criado;
        aud (audience) = Destinatário do token, representa a aplicação que irá usá-lo.    
        */

        try {
            //pega o usuario pela request
            const user = req.user;
    
            //Verifica se o usuario existe
            if(!user){
                throw new ForbiddenError("Usuario não informado");
            }
    
            //Conteudo do token
            const jwtPayload = { username: user.username};
            //id do user
            const jwtOptions = { subject: user?.uuid}
            //Chave privada
            const jwtSecret = "my_secret_key";
    
    
            const jwt = JWT.sign(jwtPayload, jwtSecret, jwtOptions);
    
    
            res.status(StatusCodes.OK).json({token: jwt}); 
    
        } catch (error) {
            next(error);
        }    
});

export default authorizationRoute;