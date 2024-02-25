import axios from "axios";
import Prisma from "../clients/db";
import JwtService from "./jwt";

interface googleUrlResult{
    iss?: string;
    nbf?: string;
    aud?: string;
    sub?: string;
    email: string;
    email_verified: string;
    azp?: string;
    name?: string;
    picture?: string;
    given_name: string;
    family_name?: string;
    iat?: string;
    exp?: string;
    jti?: string;
    alg?: string;
    kid?: string;
    typ?: string;
}

class UserService{
    public static async googleTokenVerification(token:string){
        const googleToken=token;  
    const googleUrl=new URL("https://oauth2.googleapis.com/tokeninfo");
    googleUrl.searchParams.set('id_token',googleToken);

    const {data}=await axios.get<googleUrlResult>(googleUrl.toString(),{
        responseType:"json"
    })

    const user=await Prisma.user.findUnique({
        where:{
            email:data.email
        },
    })

    if(!user){
        await Prisma.user.create({
            data:{
                firstName:data.given_name,
                lastName:data.family_name,
                profileImage:data.picture,
                email:data.email
            }
        })
    }

    const userInDB=await Prisma.user.findUnique({
        where:{email:data.email}
    })

    if (!userInDB) throw new Error("No user found");

    const jwtToken=JwtService.generateJwtToken(userInDB);

    return jwtToken;
    }
};

export default UserService
