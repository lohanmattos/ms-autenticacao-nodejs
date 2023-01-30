import express from "express";
import errorHandler from "./middlewares/error.handler.middleware";
import authorizationRoute from "./routes/authorization.route";
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
app.use(authorizationRoute)

//Configuração do s Handlers de Erro
app.use(errorHandler);

//Inicialização do servidor
app.listen(port, ()=> {
    console.log("Servidor rodando na porta: " + port);
})