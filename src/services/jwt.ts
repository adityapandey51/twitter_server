import { User } from "@prisma/client";
import { JWTUser } from "../interfaces";
import jwt from "jsonwebtoken"

const JWTSecret="$123ad45kai";
class JwtService{
    
    public static generateJwtToken(user:User){
        const payload:JWTUser={
            id:user?.id,
            email:user?.email
        }

        
        const token =jwt.sign(payload,JWTSecret);

        return token;
    }

    public static decodeToken(token:string){
        try {
            const user=jwt.verify(token,JWTSecret)
            return user as JWTUser
        } catch (error) {
            return null;
        }
        
    }
};

export default JwtService