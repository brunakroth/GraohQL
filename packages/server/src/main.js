import express, { response } from 'express';

const server = express();
// '_'para ignorar um parâmetro
server.get('/status', (_, response) => {
    response.send({
        status: 'Okay',
    });
});

server.post('/authenticate', express.json(), (request, response) => {
    console.log(
        'E-Mail', request.body.email,
        'Senha', request.body.password
        );
        response.send();
});

// rotas são o que vem após a "barra" (/) em um link

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server is listening at http://${HOSTNAME}:${PORT}.`);
});