import express from "express";
import errorHandler from "./middlewares/error.handler.middleware";
import statusRoute from "./routes/status.route";
import userRoute from "./routes/users.route";

const port = 3000;
const app = express();

//Configuração da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuração das rotas
app.use(userRoute);
app.use(statusRoute);

//Configuração do s Handlers de Erro
app.use(errorHandler);

//Inicialização do servidor
app.listen(port, ()=> {
    console.log("Servidor rodando na porta: " + port);
})