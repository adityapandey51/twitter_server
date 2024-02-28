
import Prisma from "../../clients/db";
import { GraphqlContext } from "../../interfaces";
import UserService from "../../services/user";

const queries={
    verifyGoogleAuthToken: async(parent:any, {token}:{token:string})=>{     
        const jwtToken=await UserService.googleTokenVerification(token);
        return jwtToken
    },
    getCurrentUser:async(parent:any , args:any, ctx:GraphqlContext)=>{
        const id=ctx.user?.id; 
        if(!id) return null 
        const user=await Prisma.user.findUnique({where:{
            id
        }}) 
        return user; 
    }
}


export const resolvers={queries};