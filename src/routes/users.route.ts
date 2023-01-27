import { Router , Response, Request, NextFunction} from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../models/errors/dataBase.error.moldel";
import userRepository from "../repositories/user.repository";

const userRoute = Router();

//retorna uma lista de usuarios
userRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();

    res.status(StatusCodes.OK).send(users);
})

//retorna um usuario passado pelo id na URL
userRoute.get('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
   
    try {
        const uuid = req.params.uuid;
        const user = await userRepository.finldById(uuid);

        res.status(StatusCodes.OK).send(user);
    } catch (error) {
            //proxima pessoa que vai tratar o erro 
            //Vai chamar o error.handle.middleware.ts
            //Precisa configura esta configurado no index.ts app.use(errorHandler)
            next(error);
    }  
})

//Cria um novo usuario 
userRoute.post('/users', async (req: Request, res: Response, next: NextFunction ) => {
    const newUser = req.body; 
    const createUser = await userRepository.createUser(newUser);
    
    res.status(StatusCodes.OK).send(createUser);
})

//Editar um user
userRoute.put('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid; //busca o paramentro na url
    const modifiledUser = req.body //salva os dados do corpo da requisição

    const updateUser = userRepository.updateUser(modifiledUser)
    console.log(modifiledUser)
    res.status(StatusCodes.OK).send(updateUser);
})

//Deletar um usuario
userRoute.delete('/users/:uuid', async(req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    
    await userRepository.deleteUser(uuid)
    res.sendStatus(StatusCodes.OK);
})

//necessario para ser vizualidado por outros modulos
export default userRoute; 