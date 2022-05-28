// import express, { response } from 'express'; ver se vai funcionar ainda
import express from 'express';
// import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

async function startServer() {
    const server = new ApolloServer({
        typeDefs: gql`
        type Client {
            id: ID!
            name: String!
        }

        type Demand {
            id: ID!
            name: String!
            client: Client!
            deadline: String
        }    

        type Query {
            demands: [Demand]!
        }
        `,
        resolvers: {
            Query: {
                demands: () => [],
            }
        }
    });

    await server.start();
    server.applyMiddleware({
        app,
        cors: {
            origin: `http://${HOSTNAME}:3000`,
        },
        bodyParserConfig: true,
    });
};

// server.use(cors()); instalação global

// // '_'para ignorar um parâmetro
// server.get('/status', (_, response) => {
//     response.send({
//         status: 'Okay',
//     });
// });

// const enableCors = cors({ origin: 'http://localhost:3000' })

// server
// .options('/authenticate', enableCors)
// .post('/authenticate', enableCors, express.json(), (request, response) => {
//     console.log(
//         'E-Mail', request.body.email,
//         'Senha', request.body.password
//         );
//         response.send({
//             Okay: true,
//         });
// });

// rotas são o que vem após a "barra" (/) em um link

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';

startServer();
app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is listening at http://${HOSTNAME}:${PORT}.`);
});