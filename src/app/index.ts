import express, { query } from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { User } from "./Users";
import cors from "cors"

export const serverInit=async ()=>{
    const app=express();
    app.use(cors())
    app.use(express.json());

    const graphqlServer=new ApolloServer({
        typeDefs:`
           ${User.types}
            type Query {
                ${User.queries}
            }
        `,
        resolvers:{
            Query:{
                ...User.resolvers.queries,
            },
            
        }
    })

    await  graphqlServer.start()

    app.use("/graphql", expressMiddleware(graphqlServer))

    return app;
}
