import { Router , Response, Request, NextFunction} from "express";
import { StatusCodes } from "http-status-codes";

const userRoute = Router();

//retorna uma lista de usuarios
userRoute.get('/users', (req: Request, res: Response, next: NextFunction) => {
    const users = [{
        userName: 'Lohan Amendola'
    }]

    res.status(StatusCodes.OK).send(users);
})

//retorna um usuario passado pelo id na URL
userRoute.get('/users/:uuid', (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    
    const uuid = req.params.uuid;;

    res.status(StatusCodes.OK).send({uuid});
})

//Cria um novo usuario 
userRoute.post('/users', (req: Request, res: Response, next: NextFunction ) => {
    const newUser = req.body; 

    res.status(StatusCodes.CREATED).send(newUser);
})

//Editar um user
userRoute.put('/users/:uuid', (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid; 
    const modifiledUser = req.body

    modifiledUser.uuid = uuid;

    res.status(StatusCodes.OK).send({modifiledUser});
})

//Deletar um usuario

userRoute.delete('/users/:uuid', (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
})

//necessario para ser vizualidado por outros modulos
export default userRoute; 