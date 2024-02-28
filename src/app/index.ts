import express, { query } from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { User } from "./Users";
import cors from "cors"
import { GraphqlContext } from "../interfaces";
import JwtService from "../services/jwt";

export const serverInit=async ()=>{
    const app=express();
    app.use(cors())
    app.use(express.json());

    const graphqlServer=new ApolloServer<GraphqlContext>({
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

    app.use("/graphql", expressMiddleware(graphqlServer,{
        context:async ({req,res})=>{
            return{
                user: ((req.headers.authorization) ? JwtService.decodeToken(req.headers.authorization.split('Bearer ')[1]):undefined)
            }

        
        }
    }))

    return app;
}
