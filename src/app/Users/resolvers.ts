
import UserService from "../../services/user";

const queries={
    verifyGoogleAuthToken: async(parent:any, {token}:{token:string})=>{     
        const jwtToken=await UserService.googleTokenVerification(token);
        return jwtToken
    }
}


export const resolvers={queries};