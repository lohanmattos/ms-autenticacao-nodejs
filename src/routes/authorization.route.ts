import {Request, NextFunction, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.models";


const authorizationRoute = Router();

authorizationRoute.post('/token', (req: Request, res: Response, next: NextFunction) => {

    try {
        const authorizationHeader = req.headers["authorization"];

        if(!authorizationHeader){
            throw new ForbiddenError("Credencias não informadas")
    }
        
    } catch (error) {
        next(error);
    }
    

})

export default authorizationRoute;