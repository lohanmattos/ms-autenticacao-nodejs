import express, {Request, Response, NextFunction} from "express";

const port = 3000;

const app = express();

//cria uma rota get /status
app.get('/status', (req:Request, res:Response, next:NextFunction) => {
    res.status(200).send({ foo: 'Sucesso' });
} )

app.listen(port, ()=> {
    console.log("Servidor rodando na porta: " + port);
})