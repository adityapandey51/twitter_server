import express, { query } from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

export const serverInit=async ()=>{
    const app=express();
    app.use(express.json());

    const graphqlServer=new ApolloServer({
        typeDefs:`
            type Query {
                hi :String
            }
        `,
        resolvers:{
            Query:{
                hi:()=>"hello ji namaste toh kaise hai aap log"
            }
        }
    })

    await  graphqlServer.start()

    app.use("/graphql", expressMiddleware(graphqlServer))

    return app;
}
