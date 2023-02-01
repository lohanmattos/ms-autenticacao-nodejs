import express from "express";
import errorHandler from "./middlewares/error.handler.middleware";
import authorizationRoute from "./routes/authorization.route";
import statusRoute from "./routes/status.route";
import userRoute from "./routes/users.route";
import bearerAuthenticationMiddleware from "./middlewares/jwt-authentication.middleware.ts ";

const app = express();
const host = "http://localhost";
const port = 3000;


//Configuração da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuração das rotas
app.use(statusRoute);
app.use(authorizationRoute)
app.use(bearerAuthenticationMiddleware, userRoute);



//Configuração do s Handlers de Erro
app.use(errorHandler);

//Inicialização do servidor
app.listen(port, ()=> {
    console.log(`Servidor Online: ${host}:${port}`);
})