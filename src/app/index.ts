import express, { query } from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { User } from "./Users";

export const serverInit=async ()=>{
    const app=express();
    app.use(express.json());

    const graphqlServer=new ApolloServer({
        typeDefs:`
           ${User.types}
            type Query {
                ${User.queries}
            }
            type Mutation{
                ${User.mutations}
            }
        `,
        resolvers:{
            Query:{
                ...User.resolvers.queries,
            },
            Mutation:{
                ...User.resolvers.mutations,
            }
        }
    })

    await  graphqlServer.start()

    app.use("/graphql", expressMiddleware(graphqlServer))

    return app;
}
