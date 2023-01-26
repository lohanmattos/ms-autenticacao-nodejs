import { Router , Response, Request, NextFunction} from "express";
import { StatusCodes } from "http-status-codes";
import userRepository from "../repositories/user.repository";

const userRoute = Router();

//retorna uma lista de usuarios
userRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();

    res.status(StatusCodes.OK).send(users);
})

//retorna um usuario passado pelo id na URL
userRoute.get('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const user = await userRepository.finldById(uuid);

    res.status(StatusCodes.OK).send(user);
})

//Cria um novo usuario 
userRoute.post('/users', async (req: Request, res: Response, next: NextFunction ) => {
    const newUser = req.body; 
    const createUser = await userRepository.createUser(newUser);
    
    res.status(StatusCodes.OK).send(createUser);
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